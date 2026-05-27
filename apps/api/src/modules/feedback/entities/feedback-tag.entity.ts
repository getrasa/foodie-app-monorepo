import {
  Entity,
  ManyToOne,
  PrimaryKeyProp,
} from '@mikro-orm/core';
import { Feedback } from './feedback.entity';
import { Tag } from '../../venue/entities/tag.entity';

@Entity({ tableName: 'feedbackTag' })
export class FeedbackTag {
  @ManyToOne(() => Feedback, { fieldName: 'feedbackId', primary: true })
  feedback!: Feedback;

  @ManyToOne(() => Tag, { fieldName: 'tagId', primary: true })
  tag!: Tag;

  [PrimaryKeyProp]?: ['feedback', 'tag'];
}
