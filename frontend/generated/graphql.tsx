import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type BlockedUser = {
  __typename?: 'BlockedUser';
  blockedUser: User;
  blockedUserById: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

/** Chat Inputs and Pagination */
export type ChatInput = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Float']>;
};

export type ChatMessagesResponse = {
  __typename?: 'ChatMessagesResponse';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type Contact = {
  __typename?: 'Contact';
  contact?: Maybe<Contact>;
  contactId: Scalars['ID'];
  contactReadChatAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  latestMessageDate?: Maybe<Scalars['DateTime']>;
  messages?: Maybe<Array<Message>>;
  status: StatusCode;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
  userReadChatAt: Scalars['DateTime'];
};

export type ContactResponse = {
  __typename?: 'ContactResponse';
  id: Scalars['ID'];
  loggedInUserReadChatAt: Scalars['DateTime'];
  newMessages: Scalars['Boolean'];
  user: User;
};

/** Contact status enum */
export enum ContactStatus {
  ActiveContact = 'ACTIVE_CONTACT',
  NoContact = 'NO_CONTACT',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestReceivedFalse = 'REQUEST_RECEIVED_FALSE',
  RequestSent = 'REQUEST_SENT'
}

export type CountryResponse = {
  __typename?: 'CountryResponse';
  country: Scalars['String'];
  key: Scalars['ID'];
};

/** Create Message */
export type CreateMessageInput = {
  body: Scalars['String'];
  id: Scalars['String'];
};

/** Input Arguments for Project */
export type CreateProjectInput = {
  body: Scalars['String'];
  country: Scalars['String'];
  disciplines: Array<Scalars['Float']>;
  members: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Discipline = {
  __typename?: 'Discipline';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  image?: Maybe<Image>;
  imageId: Scalars['ID'];
  profiles?: Maybe<Array<Profile>>;
  projects?: Maybe<Array<Project>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Get disciplines by id */
export type DisciplineInput = {
  disciplineIds?: InputMaybe<Array<Scalars['Float']>>;
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disciplines?: Maybe<Array<Discipline>>;
  id: Scalars['ID'];
  large?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  objectPosition?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

/** Login a User */
export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  assignedAt: Scalars['DateTime'];
  project?: Maybe<Project>;
  projectId: Scalars['ID'];
  readChatAt: Scalars['DateTime'];
  role: Role;
  status: MemberStatusCode;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

/** Input arguments for deleting a member from a project */
export type MemberInput = {
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
};

/** MemberStatus Code enum */
export enum MemberStatusCode {
  Accepted = 'ACCEPTED',
  Kicked = 'KICKED',
  Left = 'LEFT',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  contact?: Maybe<Contact>;
  contactId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type MessageSubscribtionResponse = {
  __typename?: 'MessageSubscribtionResponse';
  authReceivers: Array<Scalars['String']>;
  body: Scalars['String'];
  chatId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept contact request */
  acceptContact: Contact;
  /** Accept a project invitation */
  acceptInvite: Scalars['Boolean'];
  /** Add a user to contact list */
  addContact: Contact;
  /** Add member to project, by project id */
  addMember: Member;
  /** Block a user by id */
  blockUser: Scalars['Boolean'];
  /** Add new message by contact id */
  contactAddMessage: Message;
  /** Creates a new Project */
  createProject: Project;
  /** Sets disabled state to true, which will make user not visible */
  deleteAccount: Scalars['Boolean'];
  /** Delete contact from contacts list */
  deleteContact: Scalars['Boolean'];
  /** Delete Profile Image */
  deleteImage: Profile;
  /** Deletes a Project by projectId */
  deleteProject: Scalars['Boolean'];
  /** Kick member from project, by project id */
  kickMember: Scalars['Boolean'];
  /** Leave Project by projectId */
  leaveProject: Scalars['Boolean'];
  /** Login to an account */
  login: AuthResponse;
  /** Logout from the currently logged in account */
  logout: Scalars['Boolean'];
  /** Add Message to project, by project id */
  projectAddMessage: Message;
  /** Creates a new User */
  register: AuthResponse;
  /** Reject contact request */
  rejectContact: Scalars['Boolean'];
  /** Reject a project invitation */
  rejectInvite: Scalars['Boolean'];
  /** Report a Project by id */
  reportProject: ReportProject;
  /** Report a User by id */
  reportUser: ReportUser;
  /** Update Profile Image */
  singleUpload: UploadedFileResponse;
  /** Toggle Project disabled value to true or false */
  toggleProjectDisabled: Scalars['Boolean'];
  /** Unblock a blocked user by id */
  unblockUser: Scalars['Boolean'];
  /** Update Email */
  updateEmail: Scalars['String'];
  /** Update Password */
  updatePassword: Scalars['Boolean'];
  /** Update Profile */
  updateProfile: Profile;
  /** Updates a Project by id */
  updateProject: Project;
  /** Update socials */
  updateSocials: Social;
  /** Update Username */
  updateUsername: Scalars['String'];
};


export type MutationAcceptContactArgs = {
  id: Scalars['String'];
};


export type MutationAcceptInviteArgs = {
  projectId: Scalars['String'];
};


export type MutationAddContactArgs = {
  id: Scalars['String'];
};


export type MutationAddMemberArgs = {
  data: MemberInput;
};


export type MutationBlockUserArgs = {
  id: Scalars['String'];
};


export type MutationContactAddMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationDeleteContactArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationKickMemberArgs = {
  data: MemberInput;
};


export type MutationLeaveProjectArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationProjectAddMessageArgs = {
  data: CreateMessageInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRejectContactArgs = {
  id: Scalars['String'];
};


export type MutationRejectInviteArgs = {
  projectId: Scalars['String'];
};


export type MutationReportProjectArgs = {
  data: ReportProjectInput;
};


export type MutationReportUserArgs = {
  data: ReportUserInput;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationToggleProjectDisabledArgs = {
  projectId: Scalars['String'];
};


export type MutationUnblockUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateSocialsArgs = {
  data: SocialInput;
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  notificationCode: NotificationCode;
  projectId?: Maybe<Scalars['String']>;
  read: Scalars['Boolean'];
  receiver?: Maybe<User>;
  receiverId: Scalars['ID'];
  senderId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Notification Code enum  */
export enum NotificationCode {
  AdminAssigned = 'ADMIN_ASSIGNED',
  ContactAccepted = 'CONTACT_ACCEPTED',
  ContactRequest = 'CONTACT_REQUEST',
  ContactUsernameUpdated = 'CONTACT_USERNAME_UPDATED',
  ProjectDeleted = 'PROJECT_DELETED',
  ProjectInvitation = 'PROJECT_INVITATION',
  ProjectKicked = 'PROJECT_KICKED',
  ProjectTitleUpdated = 'PROJECT_TITLE_UPDATED'
}

/** Pagination Args */
export type PaginationArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};

/** Pagination Args With Username Argument */
export type PaginationUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  username: Scalars['ID'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  discipline?: Maybe<Discipline>;
  disciplineId?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type Project = {
  __typename?: 'Project';
  body: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  disciplines?: Maybe<Array<Discipline>>;
  id: Scalars['ID'];
  latestMessageDate?: Maybe<Scalars['DateTime']>;
  members?: Maybe<Array<Member>>;
  messages?: Maybe<Array<Message>>;
  reports?: Maybe<Array<ReportProject>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Project By Id Args */
export type ProjectById = {
  id: Scalars['ID'];
  role?: InputMaybe<Array<Role>>;
  status?: InputMaybe<Array<MemberStatusCode>>;
};

/** Project member status enum */
export enum ProjectMemberStatus {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  InvitedUser = 'INVITED_USER',
  Member = 'MEMBER',
  User = 'USER'
}

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  body: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  disciplines?: Maybe<Array<Discipline>>;
  id: Scalars['ID'];
  latestMessageDate?: Maybe<Scalars['DateTime']>;
  members?: Maybe<Array<Member>>;
  messages?: Maybe<Array<Message>>;
  newMessages: Scalars['Boolean'];
  reports?: Maybe<Array<ReportProject>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Filter Projects */
export type ProjectsFilterArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  disciplines?: InputMaybe<Array<Scalars['Float']>>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  searchText?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Sort>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns all blocked users */
  blockedUsers: Array<BlockedUser>;
  /** Return contact user by id */
  contactById: User;
  /** Return all contact chats */
  contactChats?: Maybe<Array<ContactResponse>>;
  /** Return messages for contact by id */
  contactMessages?: Maybe<ChatMessagesResponse>;
  /** Return the status for a contact request between loggedInUser and userId */
  contactStatus: ContactStatus;
  /** Returns all contacts for loggedInUser */
  contacts: Array<User>;
  /** Returns countries */
  countries?: Maybe<Array<CountryResponse>>;
  /** Returns disciplines */
  disciplines?: Maybe<Array<Discipline>>;
  /** Checks if user is blocked */
  isUserBlocked: Scalars['Boolean'];
  /** Returns the "user" data for the user that is currently logged in  */
  loggedInUser: User;
  /** Query all notifications, project invitations & friend requests for logged in user */
  notificationsByLoggedInUser?: Maybe<User>;
  /** Return project by id */
  projectById?: Maybe<Project>;
  /** Returns all project chats */
  projectChats?: Maybe<Array<ProjectResponse>>;
  /** Returns member status of auth user or not auth guest */
  projectMemberStatus?: Maybe<ProjectMemberStatus>;
  /** Return messages for a project by id */
  projectMessages?: Maybe<ChatMessagesResponse>;
  /** Returns all projects that are not disabled */
  projects?: Maybe<Array<Project>>;
  /** Return all projects by username which are not disabled */
  projectsByUsername?: Maybe<Array<Project>>;
  /** Return all projects for the currently logged in user */
  projectsByloggedInUser?: Maybe<Array<Project>>;
  /** Returns the social data for the user that is currently logged in  */
  socialsByLoggedInUser: Social;
  /** Returns the social data by user id */
  socialsByUserId: Social;
  /** Returns a user by username */
  userByUsername?: Maybe<User>;
  /** Returns all users/profiles except logged in user (if authenticated) */
  users?: Maybe<Array<User>>;
};


export type QueryContactByIdArgs = {
  id: Scalars['String'];
};


export type QueryContactChatsArgs = {
  data: SearchArgs;
};


export type QueryContactMessagesArgs = {
  data: ChatInput;
};


export type QueryContactStatusArgs = {
  id: Scalars['String'];
};


export type QueryDisciplinesArgs = {
  data?: InputMaybe<DisciplineInput>;
};


export type QueryIsUserBlockedArgs = {
  id: Scalars['String'];
};


export type QueryNotificationsByLoggedInUserArgs = {
  data: PaginationArgs;
};


export type QueryProjectByIdArgs = {
  data: ProjectById;
};


export type QueryProjectChatsArgs = {
  data: SearchArgs;
};


export type QueryProjectMemberStatusArgs = {
  id: Scalars['String'];
};


export type QueryProjectMessagesArgs = {
  data: ChatInput;
};


export type QueryProjectsArgs = {
  data: ProjectsFilterArgs;
};


export type QueryProjectsByUsernameArgs = {
  data: PaginationUserArgs;
};


export type QueryProjectsByloggedInUserArgs = {
  data: PaginationArgs;
};


export type QuerySocialsByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  data: UsersFilterArgs;
};

/** Create a new user */
export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type ReportProject = {
  __typename?: 'ReportProject';
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  project?: Maybe<Project>;
  projectId: Scalars['String'];
  senderId: Scalars['String'];
  title: Scalars['String'];
  violation: Violation;
};

/** Input argument types for reporting a project */
export type ReportProjectInput = {
  body: Scalars['String'];
  projectId: Scalars['String'];
  title: Scalars['String'];
  violation: Violation;
};

export type ReportUser = {
  __typename?: 'ReportUser';
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  senderId: Scalars['String'];
  title: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
  violation: Violation;
};

/** Input argument types for reporting a user */
export type ReportUserInput = {
  body: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
  violation: Violation;
};

/** Role enum for projects ADMIN/MEMBER */
export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

/** Search Args */
export type SearchArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type Social = {
  __typename?: 'Social';
  behance?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  discord?: Maybe<Scalars['String']>;
  dribbble?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  soundcloud?: Maybe<Scalars['String']>;
  spotify?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
  vimeo?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

/** Input Arguments for social links */
export type SocialInput = {
  behance: Scalars['String'];
  discord: Scalars['String'];
  dribbble: Scalars['String'];
  github: Scalars['String'];
  instagram: Scalars['String'];
  linkedin: Scalars['String'];
  medium: Scalars['String'];
  pinterest: Scalars['String'];
  soundcloud: Scalars['String'];
  spotify: Scalars['String'];
  vimeo: Scalars['String'];
  youtube: Scalars['String'];
};

/** Sort by most recent or oldest */
export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

/** Status Code enum */
export enum StatusCode {
  False = 'FALSE',
  Pending = 'PENDING',
  True = 'TRUE'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageSubscribtionResponse;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['String'];
};

/** Update Password Input */
export type UpdatePasswordInput = {
  confirmPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

/** Update Profile Input */
export type UpdateProfileInput = {
  bio: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  disciplineId?: InputMaybe<Scalars['Float']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Input Arguments for Project */
export type UpdateProjectInput = {
  body: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  disciplines: Array<Scalars['Float']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Messages?: Maybe<Array<Message>>;
  blockedUsers?: Maybe<Array<BlockedUser>>;
  contactsRcvd?: Maybe<Array<Contact>>;
  contactsSent?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  email: Scalars['String'];
  id: Scalars['ID'];
  member?: Maybe<Array<Member>>;
  memberOf?: Maybe<Array<Member>>;
  notifications?: Maybe<Array<Notification>>;
  profile?: Maybe<Profile>;
  reports?: Maybe<Array<ReportUser>>;
  socials?: Maybe<Social>;
  tokenVersion: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

/** Filter Users */
export type UsersFilterArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  disciplines?: InputMaybe<Array<Scalars['Float']>>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  searchText?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Sort>;
};

/** Violation enum */
export enum Violation {
  Adultcontent = 'ADULTCONTENT',
  Fake = 'FAKE',
  Harrasment = 'HARRASMENT',
  Plagiarism = 'PLAGIARISM',
  Scam = 'SCAM',
  Somethingelse = 'SOMETHINGELSE',
  Spam = 'SPAM'
}

export type AcceptContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AcceptContactMutation = { __typename?: 'Mutation', acceptContact: { __typename?: 'Contact', id: string } };

export type AcceptInviteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: boolean };

export type AddContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddContactMutation = { __typename?: 'Mutation', addContact: { __typename?: 'Contact', id: string } };

export type AddMemberMutationVariables = Exact<{
  data: MemberInput;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: { __typename?: 'Member', userId: string, role: Role, status: MemberStatusCode, projectId: string, user: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, lastName?: string | null | undefined, firstName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } } };

export type BlockUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: boolean };

export type ContactAddMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type ContactAddMessageMutation = { __typename?: 'Mutation', contactAddMessage: { __typename?: 'Message', id: string, body: string, createdAt: any, user?: { __typename?: 'User', username: string, profile?: { __typename?: 'Profile', userId: string, fullName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } | null | undefined } };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, body: string, country?: string | null | undefined, members?: Array<{ __typename?: 'Member', userId: string, role: Role, user: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, lastName?: string | null | undefined, firstName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } }> | null | undefined } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: boolean };

export type DeleteImageMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteImageMutation = { __typename?: 'Mutation', deleteImage: { __typename?: 'Profile', profileImage?: string | null | undefined } };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type KickMemberMutationVariables = Exact<{
  data: MemberInput;
}>;


export type KickMemberMutation = { __typename?: 'Mutation', kickMember: boolean };

export type LeaveProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LeaveProjectMutation = { __typename?: 'Mutation', leaveProject: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ProjectAddMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type ProjectAddMessageMutation = { __typename?: 'Mutation', projectAddMessage: { __typename?: 'Message', id: string, body: string, createdAt: any, user?: { __typename?: 'User', username: string, profile?: { __typename?: 'Profile', userId: string, fullName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined } } };

export type RejectContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RejectContactMutation = { __typename?: 'Mutation', rejectContact: boolean };

export type ReportProjectMutationVariables = Exact<{
  data: ReportProjectInput;
}>;


export type ReportProjectMutation = { __typename?: 'Mutation', reportProject: { __typename?: 'ReportProject', id: string, title: string, body?: string | null | undefined, violation: Violation, createdAt: any } };

export type ReportUserMutationVariables = Exact<{
  data: ReportUserInput;
}>;


export type ReportUserMutation = { __typename?: 'Mutation', reportUser: { __typename?: 'ReportUser', id: string, title: string, body?: string | null | undefined, violation: Violation, createdAt: any } };

export type ToggleProjectDisabledMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ToggleProjectDisabledMutation = { __typename?: 'Mutation', toggleProjectDisabled: boolean };

export type UnblockUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type UpdateEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail: string };

export type UpdatePasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, country?: string | null | undefined, bio?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, body: string, country?: string | null | undefined, disciplines?: Array<{ __typename?: 'Discipline', id: number, title: string }> | null | undefined } };

export type UpdateSocialsMutationVariables = Exact<{
  data: SocialInput;
}>;


export type UpdateSocialsMutation = { __typename?: 'Mutation', updateSocials: { __typename?: 'Social', instagram?: string | null | undefined, behance?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, pinterest?: string | null | undefined, soundcloud?: string | null | undefined, spotify?: string | null | undefined, vimeo?: string | null | undefined, medium?: string | null | undefined, youtube?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } };

export type UpdateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: string };

export type SingleUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type SingleUploadMutation = { __typename?: 'Mutation', singleUpload: { __typename?: 'UploadedFileResponse', filename: string, mimetype: string, encoding: string, url: string } };

export type ContactByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContactByIdQuery = { __typename?: 'Query', contactById: { __typename?: 'User', username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } };

export type ContactChatsQueryVariables = Exact<{
  data: SearchArgs;
}>;


export type ContactChatsQuery = { __typename?: 'Query', contactChats?: Array<{ __typename?: 'ContactResponse', id: string, newMessages: boolean, loggedInUserReadChatAt: any, user: { __typename?: 'User', profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } }> | null | undefined };

export type ContactMessagesQueryVariables = Exact<{
  data: ChatInput;
}>;


export type ContactMessagesQuery = { __typename?: 'Query', contactMessages?: { __typename?: 'ChatMessagesResponse', hasMore: boolean, messages: Array<{ __typename?: 'Message', id: string, body: string, user?: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } | null | undefined }> } | null | undefined };

export type ContactStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContactStatusQuery = { __typename?: 'Query', contactStatus: ContactStatus };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries?: Array<{ __typename?: 'CountryResponse', key: string, country: string }> | null | undefined };

export type DisciplinesQueryVariables = Exact<{ [key: string]: never; }>;


export type DisciplinesQuery = { __typename?: 'Query', disciplines?: Array<{ __typename?: 'Discipline', id: number, title: string, image?: { __typename?: 'Image', id: string, small?: string | null | undefined, alt?: string | null | undefined } | null | undefined }> | null | undefined };

export type DisciplinesLandingQueryVariables = Exact<{
  data?: InputMaybe<DisciplineInput>;
}>;


export type DisciplinesLandingQuery = { __typename?: 'Query', disciplines?: Array<{ __typename?: 'Discipline', id: number, title: string, image?: { __typename?: 'Image', id: string, small?: string | null | undefined, alt?: string | null | undefined } | null | undefined }> | null | undefined };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, email: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, bio?: string | null | undefined, profileImage?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } | null | undefined, socials?: { __typename?: 'Social', instagram?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, behance?: string | null | undefined, soundcloud?: string | null | undefined, pinterest?: string | null | undefined, spotify?: string | null | undefined, medium?: string | null | undefined, vimeo?: string | null | undefined, youtube?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } | null | undefined } };

export type LoggedInSocialDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInSocialDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, socials?: { __typename?: 'Social', instagram?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, behance?: string | null | undefined, soundcloud?: string | null | undefined, pinterest?: string | null | undefined, spotify?: string | null | undefined, medium?: string | null | undefined, vimeo?: string | null | undefined, youtube?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } | null | undefined } };

export type LoggedInProfileDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInProfileDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, bio?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } | null | undefined } };

export type LoggedInAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInAccountDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, email: string, username: string } };

export type ProfileImageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileImageQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } };

export type LoggedInUsernameQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUsernameQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: string, username: string } };

export type IsUserBlockedQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IsUserBlockedQuery = { __typename?: 'Query', isUserBlocked: boolean };

export type ProfileDetailsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ProfileDetailsQuery = { __typename?: 'Query', userByUsername?: { __typename?: 'User', id: string, username: string, email: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, bio?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined, socials?: { __typename?: 'Social', userId: string, instagram?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, behance?: string | null | undefined, soundcloud?: string | null | undefined, pinterest?: string | null | undefined, spotify?: string | null | undefined, medium?: string | null | undefined, youtube?: string | null | undefined, vimeo?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } | null | undefined } | null | undefined };

export type ProjectByIdQueryVariables = Exact<{
  data: ProjectById;
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, title: string, body: string, country?: string | null | undefined, members?: Array<{ __typename?: 'Member', userId: string, role: Role, user: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, lastName?: string | null | undefined, firstName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } }> | null | undefined } | null | undefined };

export type ProjectFormValuesQueryVariables = Exact<{
  data: ProjectById;
}>;


export type ProjectFormValuesQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, title: string, body: string, country?: string | null | undefined, disciplines?: Array<{ __typename?: 'Discipline', id: number }> | null | undefined } | null | undefined };

export type ProjectMembersQueryVariables = Exact<{
  data: ProjectById;
}>;


export type ProjectMembersQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, members?: Array<{ __typename?: 'Member', projectId: string, userId: string, role: Role, status: MemberStatusCode, user: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, lastName?: string | null | undefined, firstName?: string | null | undefined, country?: string | null | undefined, profileImage?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined } }> | null | undefined } | null | undefined };

export type ProjectDisabledStatusQueryVariables = Exact<{
  data: ProjectById;
}>;


export type ProjectDisabledStatusQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, disabled: boolean } | null | undefined };

export type ProjectMemberStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectMemberStatusQuery = { __typename?: 'Query', projectMemberStatus?: ProjectMemberStatus | null | undefined };

export type ProjectChatsQueryVariables = Exact<{
  data: SearchArgs;
}>;


export type ProjectChatsQuery = { __typename?: 'Query', projectChats?: Array<{ __typename?: 'ProjectResponse', id: string, title: string, newMessages: boolean }> | null | undefined };

export type ProjectTitleQueryVariables = Exact<{
  data: ProjectById;
}>;


export type ProjectTitleQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: string, title: string } | null | undefined };

export type ProjectMessagesQueryVariables = Exact<{
  data: ChatInput;
}>;


export type ProjectMessagesQuery = { __typename?: 'Query', projectMessages?: { __typename?: 'ChatMessagesResponse', hasMore: boolean, messages: Array<{ __typename?: 'Message', id: string, body: string, user?: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } | null | undefined }> } | null | undefined };

export type ProjectsQueryVariables = Exact<{
  data: ProjectsFilterArgs;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, title: string, disciplines?: Array<{ __typename?: 'Discipline', image?: { __typename?: 'Image', id: string, small?: string | null | undefined, alt?: string | null | undefined, objectPosition?: string | null | undefined } | null | undefined }> | null | undefined }> | null | undefined };

export type ProjectsByUsernameQueryVariables = Exact<{
  data: PaginationUserArgs;
}>;


export type ProjectsByUsernameQuery = { __typename?: 'Query', projectsByUsername?: Array<{ __typename?: 'Project', id: string, title: string, disciplines?: Array<{ __typename?: 'Discipline', image?: { __typename?: 'Image', id: string, small?: string | null | undefined, alt?: string | null | undefined, objectPosition?: string | null | undefined } | null | undefined }> | null | undefined }> | null | undefined };

export type UsersQueryVariables = Exact<{
  data: UsersFilterArgs;
}>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string, id: number } | null | undefined } | null | undefined }> | null | undefined };

export type NewMessageSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'MessageSubscribtionResponse', id: string, body: string, user?: { __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', userId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } | null | undefined } };


export const AcceptContactDocument = gql`
    mutation acceptContact($id: String!) {
  acceptContact(id: $id) {
    id
  }
}
    `;
export type AcceptContactMutationFn = Apollo.MutationFunction<AcceptContactMutation, AcceptContactMutationVariables>;

/**
 * __useAcceptContactMutation__
 *
 * To run a mutation, you first call `useAcceptContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptContactMutation, { data, loading, error }] = useAcceptContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptContactMutation(baseOptions?: Apollo.MutationHookOptions<AcceptContactMutation, AcceptContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptContactMutation, AcceptContactMutationVariables>(AcceptContactDocument, options);
      }
export type AcceptContactMutationHookResult = ReturnType<typeof useAcceptContactMutation>;
export type AcceptContactMutationResult = Apollo.MutationResult<AcceptContactMutation>;
export type AcceptContactMutationOptions = Apollo.BaseMutationOptions<AcceptContactMutation, AcceptContactMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation acceptInvite($id: String!) {
  acceptInvite(projectId: $id)
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const AddContactDocument = gql`
    mutation addContact($id: String!) {
  addContact(id: $id) {
    id
  }
}
    `;
export type AddContactMutationFn = Apollo.MutationFunction<AddContactMutation, AddContactMutationVariables>;

/**
 * __useAddContactMutation__
 *
 * To run a mutation, you first call `useAddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContactMutation, { data, loading, error }] = useAddContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddContactMutation(baseOptions?: Apollo.MutationHookOptions<AddContactMutation, AddContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContactMutation, AddContactMutationVariables>(AddContactDocument, options);
      }
export type AddContactMutationHookResult = ReturnType<typeof useAddContactMutation>;
export type AddContactMutationResult = Apollo.MutationResult<AddContactMutation>;
export type AddContactMutationOptions = Apollo.BaseMutationOptions<AddContactMutation, AddContactMutationVariables>;
export const AddMemberDocument = gql`
    mutation addMember($data: MemberInput!) {
  addMember(data: $data) {
    userId
    role
    status
    projectId
    user {
      id
      username
      profile {
        userId
        lastName
        firstName
        country
        profileImage
        discipline {
          title
        }
      }
    }
  }
}
    `;
export type AddMemberMutationFn = Apollo.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, options);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($id: String!) {
  blockUser(id: $id)
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const ContactAddMessageDocument = gql`
    mutation contactAddMessage($data: CreateMessageInput!) {
  contactAddMessage(data: $data) {
    id
    body
    user {
      username
      profile {
        userId
        fullName
        profileImage
      }
    }
    createdAt
  }
}
    `;
export type ContactAddMessageMutationFn = Apollo.MutationFunction<ContactAddMessageMutation, ContactAddMessageMutationVariables>;

/**
 * __useContactAddMessageMutation__
 *
 * To run a mutation, you first call `useContactAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactAddMessageMutation, { data, loading, error }] = useContactAddMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useContactAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<ContactAddMessageMutation, ContactAddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ContactAddMessageMutation, ContactAddMessageMutationVariables>(ContactAddMessageDocument, options);
      }
export type ContactAddMessageMutationHookResult = ReturnType<typeof useContactAddMessageMutation>;
export type ContactAddMessageMutationResult = Apollo.MutationResult<ContactAddMessageMutation>;
export type ContactAddMessageMutationOptions = Apollo.BaseMutationOptions<ContactAddMessageMutation, ContactAddMessageMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectInput!) {
  createProject(data: $data) {
    id
    title
    body
    country
    members {
      userId
      role
      user {
        id
        username
        profile {
          userId
          lastName
          firstName
          country
          profileImage
          discipline {
            title
          }
        }
      }
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount {
  deleteAccount
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteContactDocument = gql`
    mutation deleteContact($id: String!) {
  deleteContact(id: $id)
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;
export const DeleteImageDocument = gql`
    mutation deleteImage {
  deleteImage {
    profileImage
  }
}
    `;
export type DeleteImageMutationFn = Apollo.MutationFunction<DeleteImageMutation, DeleteImageMutationVariables>;

/**
 * __useDeleteImageMutation__
 *
 * To run a mutation, you first call `useDeleteImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageMutation, { data, loading, error }] = useDeleteImageMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteImageMutation, DeleteImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteImageMutation, DeleteImageMutationVariables>(DeleteImageDocument, options);
      }
export type DeleteImageMutationHookResult = ReturnType<typeof useDeleteImageMutation>;
export type DeleteImageMutationResult = Apollo.MutationResult<DeleteImageMutation>;
export type DeleteImageMutationOptions = Apollo.BaseMutationOptions<DeleteImageMutation, DeleteImageMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: String!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const KickMemberDocument = gql`
    mutation kickMember($data: MemberInput!) {
  kickMember(data: $data)
}
    `;
export type KickMemberMutationFn = Apollo.MutationFunction<KickMemberMutation, KickMemberMutationVariables>;

/**
 * __useKickMemberMutation__
 *
 * To run a mutation, you first call `useKickMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickMemberMutation, { data, loading, error }] = useKickMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useKickMemberMutation(baseOptions?: Apollo.MutationHookOptions<KickMemberMutation, KickMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickMemberMutation, KickMemberMutationVariables>(KickMemberDocument, options);
      }
export type KickMemberMutationHookResult = ReturnType<typeof useKickMemberMutation>;
export type KickMemberMutationResult = Apollo.MutationResult<KickMemberMutation>;
export type KickMemberMutationOptions = Apollo.BaseMutationOptions<KickMemberMutation, KickMemberMutationVariables>;
export const LeaveProjectDocument = gql`
    mutation leaveProject($id: String!) {
  leaveProject(id: $id)
}
    `;
export type LeaveProjectMutationFn = Apollo.MutationFunction<LeaveProjectMutation, LeaveProjectMutationVariables>;

/**
 * __useLeaveProjectMutation__
 *
 * To run a mutation, you first call `useLeaveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveProjectMutation, { data, loading, error }] = useLeaveProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveProjectMutation(baseOptions?: Apollo.MutationHookOptions<LeaveProjectMutation, LeaveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveProjectMutation, LeaveProjectMutationVariables>(LeaveProjectDocument, options);
      }
export type LeaveProjectMutationHookResult = ReturnType<typeof useLeaveProjectMutation>;
export type LeaveProjectMutationResult = Apollo.MutationResult<LeaveProjectMutation>;
export type LeaveProjectMutationOptions = Apollo.BaseMutationOptions<LeaveProjectMutation, LeaveProjectMutationVariables>;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ProjectAddMessageDocument = gql`
    mutation projectAddMessage($data: CreateMessageInput!) {
  projectAddMessage(data: $data) {
    id
    body
    user {
      username
      profile {
        userId
        fullName
        profileImage
      }
    }
    createdAt
  }
}
    `;
export type ProjectAddMessageMutationFn = Apollo.MutationFunction<ProjectAddMessageMutation, ProjectAddMessageMutationVariables>;

/**
 * __useProjectAddMessageMutation__
 *
 * To run a mutation, you first call `useProjectAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectAddMessageMutation, { data, loading, error }] = useProjectAddMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<ProjectAddMessageMutation, ProjectAddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectAddMessageMutation, ProjectAddMessageMutationVariables>(ProjectAddMessageDocument, options);
      }
export type ProjectAddMessageMutationHookResult = ReturnType<typeof useProjectAddMessageMutation>;
export type ProjectAddMessageMutationResult = Apollo.MutationResult<ProjectAddMessageMutation>;
export type ProjectAddMessageMutationOptions = Apollo.BaseMutationOptions<ProjectAddMessageMutation, ProjectAddMessageMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(data: $data) {
    accessToken
    user {
      id
      username
      profile {
        userId
        firstName
        lastName
      }
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RejectContactDocument = gql`
    mutation rejectContact($id: String!) {
  rejectContact(id: $id)
}
    `;
export type RejectContactMutationFn = Apollo.MutationFunction<RejectContactMutation, RejectContactMutationVariables>;

/**
 * __useRejectContactMutation__
 *
 * To run a mutation, you first call `useRejectContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectContactMutation, { data, loading, error }] = useRejectContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectContactMutation(baseOptions?: Apollo.MutationHookOptions<RejectContactMutation, RejectContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectContactMutation, RejectContactMutationVariables>(RejectContactDocument, options);
      }
export type RejectContactMutationHookResult = ReturnType<typeof useRejectContactMutation>;
export type RejectContactMutationResult = Apollo.MutationResult<RejectContactMutation>;
export type RejectContactMutationOptions = Apollo.BaseMutationOptions<RejectContactMutation, RejectContactMutationVariables>;
export const ReportProjectDocument = gql`
    mutation reportProject($data: ReportProjectInput!) {
  reportProject(data: $data) {
    id
    title
    body
    violation
    createdAt
  }
}
    `;
export type ReportProjectMutationFn = Apollo.MutationFunction<ReportProjectMutation, ReportProjectMutationVariables>;

/**
 * __useReportProjectMutation__
 *
 * To run a mutation, you first call `useReportProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportProjectMutation, { data, loading, error }] = useReportProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useReportProjectMutation(baseOptions?: Apollo.MutationHookOptions<ReportProjectMutation, ReportProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportProjectMutation, ReportProjectMutationVariables>(ReportProjectDocument, options);
      }
export type ReportProjectMutationHookResult = ReturnType<typeof useReportProjectMutation>;
export type ReportProjectMutationResult = Apollo.MutationResult<ReportProjectMutation>;
export type ReportProjectMutationOptions = Apollo.BaseMutationOptions<ReportProjectMutation, ReportProjectMutationVariables>;
export const ReportUserDocument = gql`
    mutation reportUser($data: ReportUserInput!) {
  reportUser(data: $data) {
    id
    title
    body
    violation
    createdAt
  }
}
    `;
export type ReportUserMutationFn = Apollo.MutationFunction<ReportUserMutation, ReportUserMutationVariables>;

/**
 * __useReportUserMutation__
 *
 * To run a mutation, you first call `useReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUserMutation, { data, loading, error }] = useReportUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useReportUserMutation(baseOptions?: Apollo.MutationHookOptions<ReportUserMutation, ReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUserMutation, ReportUserMutationVariables>(ReportUserDocument, options);
      }
export type ReportUserMutationHookResult = ReturnType<typeof useReportUserMutation>;
export type ReportUserMutationResult = Apollo.MutationResult<ReportUserMutation>;
export type ReportUserMutationOptions = Apollo.BaseMutationOptions<ReportUserMutation, ReportUserMutationVariables>;
export const ToggleProjectDisabledDocument = gql`
    mutation toggleProjectDisabled($projectId: String!) {
  toggleProjectDisabled(projectId: $projectId)
}
    `;
export type ToggleProjectDisabledMutationFn = Apollo.MutationFunction<ToggleProjectDisabledMutation, ToggleProjectDisabledMutationVariables>;

/**
 * __useToggleProjectDisabledMutation__
 *
 * To run a mutation, you first call `useToggleProjectDisabledMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleProjectDisabledMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleProjectDisabledMutation, { data, loading, error }] = useToggleProjectDisabledMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useToggleProjectDisabledMutation(baseOptions?: Apollo.MutationHookOptions<ToggleProjectDisabledMutation, ToggleProjectDisabledMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleProjectDisabledMutation, ToggleProjectDisabledMutationVariables>(ToggleProjectDisabledDocument, options);
      }
export type ToggleProjectDisabledMutationHookResult = ReturnType<typeof useToggleProjectDisabledMutation>;
export type ToggleProjectDisabledMutationResult = Apollo.MutationResult<ToggleProjectDisabledMutation>;
export type ToggleProjectDisabledMutationOptions = Apollo.BaseMutationOptions<ToggleProjectDisabledMutation, ToggleProjectDisabledMutationVariables>;
export const UnblockUserDocument = gql`
    mutation unblockUser($id: String!) {
  unblockUser(id: $id)
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const UpdateEmailDocument = gql`
    mutation updateEmail($email: String!) {
  updateEmail(email: $email)
}
    `;
export type UpdateEmailMutationFn = Apollo.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

/**
 * __useUpdateEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailMutation, { data, loading, error }] = useUpdateEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, options);
      }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = Apollo.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($data: UpdatePasswordInput!) {
  updatePassword(data: $data)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($data: UpdateProfileInput!) {
  updateProfile(data: $data) {
    userId
    firstName
    lastName
    country
    discipline {
      id
      title
    }
    bio
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    id
    title
    body
    country
    disciplines {
      id
      title
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateSocialsDocument = gql`
    mutation updateSocials($data: SocialInput!) {
  updateSocials(data: $data) {
    instagram
    behance
    linkedin
    dribbble
    pinterest
    soundcloud
    spotify
    vimeo
    medium
    youtube
    github
    discord
  }
}
    `;
export type UpdateSocialsMutationFn = Apollo.MutationFunction<UpdateSocialsMutation, UpdateSocialsMutationVariables>;

/**
 * __useUpdateSocialsMutation__
 *
 * To run a mutation, you first call `useUpdateSocialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialsMutation, { data, loading, error }] = useUpdateSocialsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSocialsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialsMutation, UpdateSocialsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialsMutation, UpdateSocialsMutationVariables>(UpdateSocialsDocument, options);
      }
export type UpdateSocialsMutationHookResult = ReturnType<typeof useUpdateSocialsMutation>;
export type UpdateSocialsMutationResult = Apollo.MutationResult<UpdateSocialsMutation>;
export type UpdateSocialsMutationOptions = Apollo.BaseMutationOptions<UpdateSocialsMutation, UpdateSocialsMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation updateUsername($username: String!) {
  updateUsername(username: $username)
}
    `;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const SingleUploadDocument = gql`
    mutation singleUpload($file: Upload!) {
  singleUpload(file: $file) {
    filename
    mimetype
    encoding
    url
  }
}
    `;
export type SingleUploadMutationFn = Apollo.MutationFunction<SingleUploadMutation, SingleUploadMutationVariables>;

/**
 * __useSingleUploadMutation__
 *
 * To run a mutation, you first call `useSingleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singleUploadMutation, { data, loading, error }] = useSingleUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useSingleUploadMutation(baseOptions?: Apollo.MutationHookOptions<SingleUploadMutation, SingleUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SingleUploadMutation, SingleUploadMutationVariables>(SingleUploadDocument, options);
      }
export type SingleUploadMutationHookResult = ReturnType<typeof useSingleUploadMutation>;
export type SingleUploadMutationResult = Apollo.MutationResult<SingleUploadMutation>;
export type SingleUploadMutationOptions = Apollo.BaseMutationOptions<SingleUploadMutation, SingleUploadMutationVariables>;
export const ContactByIdDocument = gql`
    query contactById($id: String!) {
  contactById(id: $id) {
    username
    profile {
      userId
      firstName
      lastName
      country
      profileImage
      discipline {
        title
      }
    }
  }
}
    `;

/**
 * __useContactByIdQuery__
 *
 * To run a query within a React component, call `useContactByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContactByIdQuery(baseOptions: Apollo.QueryHookOptions<ContactByIdQuery, ContactByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactByIdQuery, ContactByIdQueryVariables>(ContactByIdDocument, options);
      }
export function useContactByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactByIdQuery, ContactByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactByIdQuery, ContactByIdQueryVariables>(ContactByIdDocument, options);
        }
export type ContactByIdQueryHookResult = ReturnType<typeof useContactByIdQuery>;
export type ContactByIdLazyQueryHookResult = ReturnType<typeof useContactByIdLazyQuery>;
export type ContactByIdQueryResult = Apollo.QueryResult<ContactByIdQuery, ContactByIdQueryVariables>;
export const ContactChatsDocument = gql`
    query contactChats($data: SearchArgs!) {
  contactChats(data: $data) {
    id
    newMessages
    user {
      profile {
        userId
        firstName
        lastName
        country
        discipline {
          title
        }
        profileImage
      }
    }
    loggedInUserReadChatAt
  }
}
    `;

/**
 * __useContactChatsQuery__
 *
 * To run a query within a React component, call `useContactChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactChatsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useContactChatsQuery(baseOptions: Apollo.QueryHookOptions<ContactChatsQuery, ContactChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactChatsQuery, ContactChatsQueryVariables>(ContactChatsDocument, options);
      }
export function useContactChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactChatsQuery, ContactChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactChatsQuery, ContactChatsQueryVariables>(ContactChatsDocument, options);
        }
export type ContactChatsQueryHookResult = ReturnType<typeof useContactChatsQuery>;
export type ContactChatsLazyQueryHookResult = ReturnType<typeof useContactChatsLazyQuery>;
export type ContactChatsQueryResult = Apollo.QueryResult<ContactChatsQuery, ContactChatsQueryVariables>;
export const ContactMessagesDocument = gql`
    query contactMessages($data: ChatInput!) {
  contactMessages(data: $data) {
    messages {
      id
      body
      user {
        id
        username
        profile {
          userId
          firstName
          lastName
          profileImage
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useContactMessagesQuery__
 *
 * To run a query within a React component, call `useContactMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactMessagesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useContactMessagesQuery(baseOptions: Apollo.QueryHookOptions<ContactMessagesQuery, ContactMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactMessagesQuery, ContactMessagesQueryVariables>(ContactMessagesDocument, options);
      }
export function useContactMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactMessagesQuery, ContactMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactMessagesQuery, ContactMessagesQueryVariables>(ContactMessagesDocument, options);
        }
export type ContactMessagesQueryHookResult = ReturnType<typeof useContactMessagesQuery>;
export type ContactMessagesLazyQueryHookResult = ReturnType<typeof useContactMessagesLazyQuery>;
export type ContactMessagesQueryResult = Apollo.QueryResult<ContactMessagesQuery, ContactMessagesQueryVariables>;
export const ContactStatusDocument = gql`
    query contactStatus($id: String!) {
  contactStatus(id: $id)
}
    `;

/**
 * __useContactStatusQuery__
 *
 * To run a query within a React component, call `useContactStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContactStatusQuery(baseOptions: Apollo.QueryHookOptions<ContactStatusQuery, ContactStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactStatusQuery, ContactStatusQueryVariables>(ContactStatusDocument, options);
      }
export function useContactStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactStatusQuery, ContactStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactStatusQuery, ContactStatusQueryVariables>(ContactStatusDocument, options);
        }
export type ContactStatusQueryHookResult = ReturnType<typeof useContactStatusQuery>;
export type ContactStatusLazyQueryHookResult = ReturnType<typeof useContactStatusLazyQuery>;
export type ContactStatusQueryResult = Apollo.QueryResult<ContactStatusQuery, ContactStatusQueryVariables>;
export const CountriesDocument = gql`
    query countries {
  countries {
    key
    country
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const DisciplinesDocument = gql`
    query disciplines {
  disciplines {
    id
    title
    image {
      id
      small
      alt
    }
  }
}
    `;

/**
 * __useDisciplinesQuery__
 *
 * To run a query within a React component, call `useDisciplinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisciplinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisciplinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDisciplinesQuery(baseOptions?: Apollo.QueryHookOptions<DisciplinesQuery, DisciplinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DisciplinesQuery, DisciplinesQueryVariables>(DisciplinesDocument, options);
      }
export function useDisciplinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DisciplinesQuery, DisciplinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DisciplinesQuery, DisciplinesQueryVariables>(DisciplinesDocument, options);
        }
export type DisciplinesQueryHookResult = ReturnType<typeof useDisciplinesQuery>;
export type DisciplinesLazyQueryHookResult = ReturnType<typeof useDisciplinesLazyQuery>;
export type DisciplinesQueryResult = Apollo.QueryResult<DisciplinesQuery, DisciplinesQueryVariables>;
export const DisciplinesLandingDocument = gql`
    query disciplinesLanding($data: DisciplineInput) {
  disciplines(data: $data) {
    id
    title
    image {
      id
      small
      alt
    }
  }
}
    `;

/**
 * __useDisciplinesLandingQuery__
 *
 * To run a query within a React component, call `useDisciplinesLandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useDisciplinesLandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDisciplinesLandingQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDisciplinesLandingQuery(baseOptions?: Apollo.QueryHookOptions<DisciplinesLandingQuery, DisciplinesLandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DisciplinesLandingQuery, DisciplinesLandingQueryVariables>(DisciplinesLandingDocument, options);
      }
export function useDisciplinesLandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DisciplinesLandingQuery, DisciplinesLandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DisciplinesLandingQuery, DisciplinesLandingQueryVariables>(DisciplinesLandingDocument, options);
        }
export type DisciplinesLandingQueryHookResult = ReturnType<typeof useDisciplinesLandingQuery>;
export type DisciplinesLandingLazyQueryHookResult = ReturnType<typeof useDisciplinesLandingLazyQuery>;
export type DisciplinesLandingQueryResult = Apollo.QueryResult<DisciplinesLandingQuery, DisciplinesLandingQueryVariables>;
export const LoggedInUserDocument = gql`
    query loggedInUser {
  loggedInUser {
    id
    email
    username
    profile {
      userId
      firstName
      lastName
      bio
      profileImage
      discipline {
        id
        title
      }
      country
    }
    socials {
      instagram
      linkedin
      dribbble
      behance
      soundcloud
      pinterest
      spotify
      medium
      vimeo
      youtube
      github
      discord
    }
  }
}
    `;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const LoggedInSocialDetailsDocument = gql`
    query loggedInSocialDetails {
  loggedInUser {
    id
    socials {
      instagram
      linkedin
      dribbble
      behance
      soundcloud
      pinterest
      spotify
      medium
      vimeo
      youtube
      github
      discord
    }
  }
}
    `;

/**
 * __useLoggedInSocialDetailsQuery__
 *
 * To run a query within a React component, call `useLoggedInSocialDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInSocialDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInSocialDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInSocialDetailsQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInSocialDetailsQuery, LoggedInSocialDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInSocialDetailsQuery, LoggedInSocialDetailsQueryVariables>(LoggedInSocialDetailsDocument, options);
      }
export function useLoggedInSocialDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInSocialDetailsQuery, LoggedInSocialDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInSocialDetailsQuery, LoggedInSocialDetailsQueryVariables>(LoggedInSocialDetailsDocument, options);
        }
export type LoggedInSocialDetailsQueryHookResult = ReturnType<typeof useLoggedInSocialDetailsQuery>;
export type LoggedInSocialDetailsLazyQueryHookResult = ReturnType<typeof useLoggedInSocialDetailsLazyQuery>;
export type LoggedInSocialDetailsQueryResult = Apollo.QueryResult<LoggedInSocialDetailsQuery, LoggedInSocialDetailsQueryVariables>;
export const LoggedInProfileDetailsDocument = gql`
    query loggedInProfileDetails {
  loggedInUser {
    id
    profile {
      userId
      firstName
      lastName
      bio
      discipline {
        id
        title
      }
      country
    }
  }
}
    `;

/**
 * __useLoggedInProfileDetailsQuery__
 *
 * To run a query within a React component, call `useLoggedInProfileDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInProfileDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInProfileDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInProfileDetailsQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInProfileDetailsQuery, LoggedInProfileDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInProfileDetailsQuery, LoggedInProfileDetailsQueryVariables>(LoggedInProfileDetailsDocument, options);
      }
export function useLoggedInProfileDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInProfileDetailsQuery, LoggedInProfileDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInProfileDetailsQuery, LoggedInProfileDetailsQueryVariables>(LoggedInProfileDetailsDocument, options);
        }
export type LoggedInProfileDetailsQueryHookResult = ReturnType<typeof useLoggedInProfileDetailsQuery>;
export type LoggedInProfileDetailsLazyQueryHookResult = ReturnType<typeof useLoggedInProfileDetailsLazyQuery>;
export type LoggedInProfileDetailsQueryResult = Apollo.QueryResult<LoggedInProfileDetailsQuery, LoggedInProfileDetailsQueryVariables>;
export const LoggedInAccountDetailsDocument = gql`
    query loggedInAccountDetails {
  loggedInUser {
    id
    email
    username
  }
}
    `;

/**
 * __useLoggedInAccountDetailsQuery__
 *
 * To run a query within a React component, call `useLoggedInAccountDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInAccountDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInAccountDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInAccountDetailsQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInAccountDetailsQuery, LoggedInAccountDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInAccountDetailsQuery, LoggedInAccountDetailsQueryVariables>(LoggedInAccountDetailsDocument, options);
      }
export function useLoggedInAccountDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInAccountDetailsQuery, LoggedInAccountDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInAccountDetailsQuery, LoggedInAccountDetailsQueryVariables>(LoggedInAccountDetailsDocument, options);
        }
export type LoggedInAccountDetailsQueryHookResult = ReturnType<typeof useLoggedInAccountDetailsQuery>;
export type LoggedInAccountDetailsLazyQueryHookResult = ReturnType<typeof useLoggedInAccountDetailsLazyQuery>;
export type LoggedInAccountDetailsQueryResult = Apollo.QueryResult<LoggedInAccountDetailsQuery, LoggedInAccountDetailsQueryVariables>;
export const ProfileImageDocument = gql`
    query profileImage {
  loggedInUser {
    id
    profile {
      userId
      firstName
      lastName
      profileImage
    }
  }
}
    `;

/**
 * __useProfileImageQuery__
 *
 * To run a query within a React component, call `useProfileImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileImageQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileImageQuery(baseOptions?: Apollo.QueryHookOptions<ProfileImageQuery, ProfileImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileImageQuery, ProfileImageQueryVariables>(ProfileImageDocument, options);
      }
export function useProfileImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileImageQuery, ProfileImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileImageQuery, ProfileImageQueryVariables>(ProfileImageDocument, options);
        }
export type ProfileImageQueryHookResult = ReturnType<typeof useProfileImageQuery>;
export type ProfileImageLazyQueryHookResult = ReturnType<typeof useProfileImageLazyQuery>;
export type ProfileImageQueryResult = Apollo.QueryResult<ProfileImageQuery, ProfileImageQueryVariables>;
export const LoggedInUsernameDocument = gql`
    query loggedInUsername {
  loggedInUser {
    id
    username
  }
}
    `;

/**
 * __useLoggedInUsernameQuery__
 *
 * To run a query within a React component, call `useLoggedInUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUsernameQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUsernameQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUsernameQuery, LoggedInUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUsernameQuery, LoggedInUsernameQueryVariables>(LoggedInUsernameDocument, options);
      }
export function useLoggedInUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUsernameQuery, LoggedInUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUsernameQuery, LoggedInUsernameQueryVariables>(LoggedInUsernameDocument, options);
        }
export type LoggedInUsernameQueryHookResult = ReturnType<typeof useLoggedInUsernameQuery>;
export type LoggedInUsernameLazyQueryHookResult = ReturnType<typeof useLoggedInUsernameLazyQuery>;
export type LoggedInUsernameQueryResult = Apollo.QueryResult<LoggedInUsernameQuery, LoggedInUsernameQueryVariables>;
export const IsUserBlockedDocument = gql`
    query isUserBlocked($id: String!) {
  isUserBlocked(id: $id)
}
    `;

/**
 * __useIsUserBlockedQuery__
 *
 * To run a query within a React component, call `useIsUserBlockedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserBlockedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserBlockedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsUserBlockedQuery(baseOptions: Apollo.QueryHookOptions<IsUserBlockedQuery, IsUserBlockedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserBlockedQuery, IsUserBlockedQueryVariables>(IsUserBlockedDocument, options);
      }
export function useIsUserBlockedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserBlockedQuery, IsUserBlockedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserBlockedQuery, IsUserBlockedQueryVariables>(IsUserBlockedDocument, options);
        }
export type IsUserBlockedQueryHookResult = ReturnType<typeof useIsUserBlockedQuery>;
export type IsUserBlockedLazyQueryHookResult = ReturnType<typeof useIsUserBlockedLazyQuery>;
export type IsUserBlockedQueryResult = Apollo.QueryResult<IsUserBlockedQuery, IsUserBlockedQueryVariables>;
export const ProfileDetailsDocument = gql`
    query profileDetails($username: String!) {
  userByUsername(username: $username) {
    id
    username
    email
    profile {
      userId
      firstName
      lastName
      bio
      country
      profileImage
      discipline {
        title
      }
    }
    socials {
      userId
      instagram
      linkedin
      dribbble
      behance
      soundcloud
      pinterest
      spotify
      medium
      youtube
      vimeo
      github
      discord
    }
  }
}
    `;

/**
 * __useProfileDetailsQuery__
 *
 * To run a query within a React component, call `useProfileDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileDetailsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useProfileDetailsQuery(baseOptions: Apollo.QueryHookOptions<ProfileDetailsQuery, ProfileDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileDetailsQuery, ProfileDetailsQueryVariables>(ProfileDetailsDocument, options);
      }
export function useProfileDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileDetailsQuery, ProfileDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileDetailsQuery, ProfileDetailsQueryVariables>(ProfileDetailsDocument, options);
        }
export type ProfileDetailsQueryHookResult = ReturnType<typeof useProfileDetailsQuery>;
export type ProfileDetailsLazyQueryHookResult = ReturnType<typeof useProfileDetailsLazyQuery>;
export type ProfileDetailsQueryResult = Apollo.QueryResult<ProfileDetailsQuery, ProfileDetailsQueryVariables>;
export const ProjectByIdDocument = gql`
    query projectById($data: ProjectById!) {
  projectById(data: $data) {
    id
    title
    body
    country
    members {
      userId
      role
      user {
        id
        username
        profile {
          userId
          lastName
          firstName
          country
          profileImage
          discipline {
            title
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProjectByIdQuery__
 *
 * To run a query within a React component, call `useProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
      }
export function useProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
        }
export type ProjectByIdQueryHookResult = ReturnType<typeof useProjectByIdQuery>;
export type ProjectByIdLazyQueryHookResult = ReturnType<typeof useProjectByIdLazyQuery>;
export type ProjectByIdQueryResult = Apollo.QueryResult<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const ProjectFormValuesDocument = gql`
    query projectFormValues($data: ProjectById!) {
  projectById(data: $data) {
    id
    title
    body
    country
    disciplines {
      id
    }
  }
}
    `;

/**
 * __useProjectFormValuesQuery__
 *
 * To run a query within a React component, call `useProjectFormValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectFormValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectFormValuesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectFormValuesQuery(baseOptions: Apollo.QueryHookOptions<ProjectFormValuesQuery, ProjectFormValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectFormValuesQuery, ProjectFormValuesQueryVariables>(ProjectFormValuesDocument, options);
      }
export function useProjectFormValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectFormValuesQuery, ProjectFormValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectFormValuesQuery, ProjectFormValuesQueryVariables>(ProjectFormValuesDocument, options);
        }
export type ProjectFormValuesQueryHookResult = ReturnType<typeof useProjectFormValuesQuery>;
export type ProjectFormValuesLazyQueryHookResult = ReturnType<typeof useProjectFormValuesLazyQuery>;
export type ProjectFormValuesQueryResult = Apollo.QueryResult<ProjectFormValuesQuery, ProjectFormValuesQueryVariables>;
export const ProjectMembersDocument = gql`
    query projectMembers($data: ProjectById!) {
  projectById(data: $data) {
    id
    members {
      projectId
      userId
      role
      status
      user {
        id
        username
        profile {
          userId
          lastName
          firstName
          country
          profileImage
          discipline {
            title
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProjectMembersQuery__
 *
 * To run a query within a React component, call `useProjectMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectMembersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectMembersQuery(baseOptions: Apollo.QueryHookOptions<ProjectMembersQuery, ProjectMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectMembersQuery, ProjectMembersQueryVariables>(ProjectMembersDocument, options);
      }
export function useProjectMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectMembersQuery, ProjectMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectMembersQuery, ProjectMembersQueryVariables>(ProjectMembersDocument, options);
        }
export type ProjectMembersQueryHookResult = ReturnType<typeof useProjectMembersQuery>;
export type ProjectMembersLazyQueryHookResult = ReturnType<typeof useProjectMembersLazyQuery>;
export type ProjectMembersQueryResult = Apollo.QueryResult<ProjectMembersQuery, ProjectMembersQueryVariables>;
export const ProjectDisabledStatusDocument = gql`
    query projectDisabledStatus($data: ProjectById!) {
  projectById(data: $data) {
    id
    disabled
  }
}
    `;

/**
 * __useProjectDisabledStatusQuery__
 *
 * To run a query within a React component, call `useProjectDisabledStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDisabledStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDisabledStatusQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectDisabledStatusQuery(baseOptions: Apollo.QueryHookOptions<ProjectDisabledStatusQuery, ProjectDisabledStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDisabledStatusQuery, ProjectDisabledStatusQueryVariables>(ProjectDisabledStatusDocument, options);
      }
export function useProjectDisabledStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDisabledStatusQuery, ProjectDisabledStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDisabledStatusQuery, ProjectDisabledStatusQueryVariables>(ProjectDisabledStatusDocument, options);
        }
export type ProjectDisabledStatusQueryHookResult = ReturnType<typeof useProjectDisabledStatusQuery>;
export type ProjectDisabledStatusLazyQueryHookResult = ReturnType<typeof useProjectDisabledStatusLazyQuery>;
export type ProjectDisabledStatusQueryResult = Apollo.QueryResult<ProjectDisabledStatusQuery, ProjectDisabledStatusQueryVariables>;
export const ProjectMemberStatusDocument = gql`
    query projectMemberStatus($id: String!) {
  projectMemberStatus(id: $id)
}
    `;

/**
 * __useProjectMemberStatusQuery__
 *
 * To run a query within a React component, call `useProjectMemberStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectMemberStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectMemberStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectMemberStatusQuery(baseOptions: Apollo.QueryHookOptions<ProjectMemberStatusQuery, ProjectMemberStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectMemberStatusQuery, ProjectMemberStatusQueryVariables>(ProjectMemberStatusDocument, options);
      }
export function useProjectMemberStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectMemberStatusQuery, ProjectMemberStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectMemberStatusQuery, ProjectMemberStatusQueryVariables>(ProjectMemberStatusDocument, options);
        }
export type ProjectMemberStatusQueryHookResult = ReturnType<typeof useProjectMemberStatusQuery>;
export type ProjectMemberStatusLazyQueryHookResult = ReturnType<typeof useProjectMemberStatusLazyQuery>;
export type ProjectMemberStatusQueryResult = Apollo.QueryResult<ProjectMemberStatusQuery, ProjectMemberStatusQueryVariables>;
export const ProjectChatsDocument = gql`
    query projectChats($data: SearchArgs!) {
  projectChats(data: $data) {
    id
    title
    newMessages
  }
}
    `;

/**
 * __useProjectChatsQuery__
 *
 * To run a query within a React component, call `useProjectChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectChatsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectChatsQuery(baseOptions: Apollo.QueryHookOptions<ProjectChatsQuery, ProjectChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectChatsQuery, ProjectChatsQueryVariables>(ProjectChatsDocument, options);
      }
export function useProjectChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectChatsQuery, ProjectChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectChatsQuery, ProjectChatsQueryVariables>(ProjectChatsDocument, options);
        }
export type ProjectChatsQueryHookResult = ReturnType<typeof useProjectChatsQuery>;
export type ProjectChatsLazyQueryHookResult = ReturnType<typeof useProjectChatsLazyQuery>;
export type ProjectChatsQueryResult = Apollo.QueryResult<ProjectChatsQuery, ProjectChatsQueryVariables>;
export const ProjectTitleDocument = gql`
    query projectTitle($data: ProjectById!) {
  projectById(data: $data) {
    id
    title
  }
}
    `;

/**
 * __useProjectTitleQuery__
 *
 * To run a query within a React component, call `useProjectTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTitleQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectTitleQuery(baseOptions: Apollo.QueryHookOptions<ProjectTitleQuery, ProjectTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTitleQuery, ProjectTitleQueryVariables>(ProjectTitleDocument, options);
      }
export function useProjectTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTitleQuery, ProjectTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTitleQuery, ProjectTitleQueryVariables>(ProjectTitleDocument, options);
        }
export type ProjectTitleQueryHookResult = ReturnType<typeof useProjectTitleQuery>;
export type ProjectTitleLazyQueryHookResult = ReturnType<typeof useProjectTitleLazyQuery>;
export type ProjectTitleQueryResult = Apollo.QueryResult<ProjectTitleQuery, ProjectTitleQueryVariables>;
export const ProjectMessagesDocument = gql`
    query projectMessages($data: ChatInput!) {
  projectMessages(data: $data) {
    messages {
      id
      body
      user {
        id
        username
        profile {
          userId
          firstName
          lastName
          profileImage
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useProjectMessagesQuery__
 *
 * To run a query within a React component, call `useProjectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectMessagesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectMessagesQuery(baseOptions: Apollo.QueryHookOptions<ProjectMessagesQuery, ProjectMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectMessagesQuery, ProjectMessagesQueryVariables>(ProjectMessagesDocument, options);
      }
export function useProjectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectMessagesQuery, ProjectMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectMessagesQuery, ProjectMessagesQueryVariables>(ProjectMessagesDocument, options);
        }
export type ProjectMessagesQueryHookResult = ReturnType<typeof useProjectMessagesQuery>;
export type ProjectMessagesLazyQueryHookResult = ReturnType<typeof useProjectMessagesLazyQuery>;
export type ProjectMessagesQueryResult = Apollo.QueryResult<ProjectMessagesQuery, ProjectMessagesQueryVariables>;
export const ProjectsDocument = gql`
    query projects($data: ProjectsFilterArgs!) {
  projects(data: $data) {
    id
    title
    disciplines {
      image {
        id
        small
        alt
        objectPosition
      }
    }
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectsByUsernameDocument = gql`
    query projectsByUsername($data: PaginationUserArgs!) {
  projectsByUsername(data: $data) {
    id
    title
    disciplines {
      image {
        id
        small
        alt
        objectPosition
      }
    }
  }
}
    `;

/**
 * __useProjectsByUsernameQuery__
 *
 * To run a query within a React component, call `useProjectsByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsByUsernameQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProjectsByUsernameQuery(baseOptions: Apollo.QueryHookOptions<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>(ProjectsByUsernameDocument, options);
      }
export function useProjectsByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>(ProjectsByUsernameDocument, options);
        }
export type ProjectsByUsernameQueryHookResult = ReturnType<typeof useProjectsByUsernameQuery>;
export type ProjectsByUsernameLazyQueryHookResult = ReturnType<typeof useProjectsByUsernameLazyQuery>;
export type ProjectsByUsernameQueryResult = Apollo.QueryResult<ProjectsByUsernameQuery, ProjectsByUsernameQueryVariables>;
export const UsersDocument = gql`
    query users($data: UsersFilterArgs!) {
  users(data: $data) {
    id
    username
    profile {
      userId
      firstName
      lastName
      profileImage
      country
      discipline {
        title
        id
      }
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const NewMessageDocument = gql`
    subscription newMessage($chatId: String!) {
  newMessage(chatId: $chatId) {
    id
    body
    user {
      id
      username
      profile {
        userId
        firstName
        lastName
        profileImage
      }
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;