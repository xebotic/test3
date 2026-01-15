/**
 * Community and collaboration types
 */

export enum GroupRole {
  OWNER = 'owner',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  isPrivate: boolean;
  createdAt: Date;
}

export interface GroupMembership {
  id: string;
  groupId: string;
  userId: string;
  role: GroupRole;
  joinedAt: Date;
}

export interface Discussion {
  id: string;
  groupId: string;
  createdBy: string;
  bookId?: number;
  chapter?: number;
  verse?: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  userId: string;
  content: string;
  createdAt: Date;
}
