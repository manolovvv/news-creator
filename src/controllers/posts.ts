import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

var DOMParser = require("dom-parser");

const cheerio = require("cheerio");
const fs = require("fs");

const getNews = async (req: Request, res: Response, next: NextFunction) => {
  let result: any = await axios.get(`https://www.bbc.com/news`);

  const doc: any = new DOMParser().parseFromString(result.data, "text/html");

  const news: NodeList = doc.getElementsByClassName("nw-o-link-split__text");
  let newsStrings: string[] = [];
  news.forEach((post) => {
    if (post.textContent === null) return;
    try {
      let newPost: string = post.textContent;
      newsStrings.push(newPost.split("&#x27;").join("'"));
    } catch (e) {
      result = (e as Error).message;
    }
  });
  return res.status(200).json({
    message: result.data,
    news: newsStrings,
  });
};

function htmlDecode(str: String) {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent;
}

// const getNewsTitles = ($: any) => {
//   const news: any = $(".nw-o-link-split__text");

//   news.forEach((index,el) => {

//   });
// };

export default { getNews };
