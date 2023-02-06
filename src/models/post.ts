import mongoose from "mongoose";

interface IPost {
  title: string;
  body: string;
}

interface newsModelInterface extends mongoose.Model<PostDoc> {
  build(attr: IPost): PostDoc;
}

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

interface PostDoc extends mongoose.Document {
  title: string;
  bodu: string;
}

newsSchema.statics.build = (attr: IPost) => {
  return new News(attr);
};

const News = mongoose.model<PostDoc, newsModelInterface>("News", newsSchema);

News.build({ title: "test", body: "testtt" });

export { News };
