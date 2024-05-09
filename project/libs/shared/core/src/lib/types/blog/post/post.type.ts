import { TLinkPost } from './link-post.type';
import { TPhotoPost } from './photo-post.type';
import { IQuotationPost } from './quotation-post.type';
import { TTextPost } from './text-post.type';
import { TVideoPost } from './video-post.type';

export type TPost = TLinkPost | TPhotoPost | IQuotationPost | TTextPost | TVideoPost;
