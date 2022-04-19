import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({
  articles: 1,
})
export class News {
  @prop({ required: true })
  articles: Array<any>;

  @prop({ required: true })
  totalArticles: number;

  @prop({ required: true })
  category: string;
}

const NewsModel = getModelForClass(News);

export default NewsModel;
