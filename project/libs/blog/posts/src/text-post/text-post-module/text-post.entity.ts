import { Entity, ITextPost, IStorableEntity } from '@project/core';

export class TextPostEntity extends Entity implements IStorableEntity<ITextPost> {
  public originalId?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public tags: string[];
  public name: string;
  public title: string;
  public text: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;

  constructor(post?: ITextPost) {
    super();
    this.populate(post);
  }

  public populate(post?: ITextPost): void {
    if (!post) {
      return;
    }

    const { id, tags, name, title, text, userId } = post;

    this.id = id ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = tags ?? [];
    this.name = name;
    this.title = title;
    this.text = text;
    this.userId = userId;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalUserId = post.originalUserId ?? '';
  }

  public toPOJO(): ITextPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      name: this.name,
      title: this.title,
      text: this.text,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
    }
  }
}
