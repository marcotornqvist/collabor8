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

/** Contact status enum */
export enum Contact_Status {
  ActiveContact = 'ACTIVE_CONTACT',
  NoContact = 'NO_CONTACT',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestReceivedFalse = 'REQUEST_RECEIVED_FALSE',
  RequestSent = 'REQUEST_SENT'
}

/** Chat Inputs and Pagination */
export type ChatInput = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Float']>;
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  contact?: Maybe<Contact>;
  contactId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  messages?: Maybe<Array<Message>>;
  project?: Maybe<Project>;
  projectId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatRoomResponse = {
  __typename?: 'ChatRoomResponse';
  readChatRooms?: Maybe<Array<ChatRoom>>;
  unreadChatRooms?: Maybe<Array<ChatRoom>>;
};

export type Contact = {
  __typename?: 'Contact';
  chatRoom?: Maybe<ChatRoom>;
  contact?: Maybe<Contact>;
  contactId: Scalars['ID'];
  contactReadChatAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  status: StatusCode;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
  userReadChatAt: Scalars['DateTime'];
};

export type ContactResponse = {
  __typename?: 'ContactResponse';
  usersWithNewMessages?: Maybe<Array<User>>;
  usersWithOldMessages?: Maybe<Array<User>>;
};

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
  profiles?: Maybe<Array<Profile>>;
  projects?: Maybe<Array<Project>>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  status: StatusCode;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

/** Input arguments for deleting a member from a project */
export type MemberInput = {
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  chatId: Scalars['ID'];
  chatRoom?: Maybe<ChatRoom>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type MessageSubscribtionResponse = {
  __typename?: 'MessageSubscribtionResponse';
  authReceivers: Array<Scalars['String']>;
  body: Scalars['String'];
  chatId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profileImage?: Maybe<Scalars['String']>;
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
  /** Add Message to contact by contact id */
  contactAddMessage: Message;
  /** Creates a new Project */
  createProject: Project;
  /** Sets disabled state to true, which will make user not visible */
  deleteAccount: Scalars['Boolean'];
  /** Delete contact from contacts list */
  deleteContact: Scalars['Boolean'];
  /** Delete Profile Image */
  deleteImage: Profile;
  /** Delete member from project, by project id */
  deleteMember: Scalars['Boolean'];
  /** Deletes a Project by projectId */
  deleteProject: Scalars['Boolean'];
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
  /** Delete/decline a project invitation */
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
  updateProjectDetails: Project;
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


export type MutationDeleteMemberArgs = {
  data: MemberInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
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


export type MutationUpdateProjectDetailsArgs = {
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

/** Pagination Args With UserId Argument */
export type PaginationUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  last?: InputMaybe<Scalars['Float']>;
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
  chatRoom?: Maybe<ChatRoom>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  disciplines?: Maybe<Array<Discipline>>;
  id: Scalars['ID'];
  members?: Maybe<Array<Member>>;
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
  /** Return details for a contact */
  contactChatRoomDetails?: Maybe<User>;
  /** Return messages for a ChatRoom by contactId */
  contactMessages?: Maybe<Array<Message>>;
  /** Return the status for a contact request between loggedInUser and userId */
  contactStatus: Contact_Status;
  /** Returns all contacts for loggedInUser */
  contacts: Array<User>;
  /** Returns all contact chatRooms */
  contactsChatRoom?: Maybe<ContactResponse>;
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
  /** Return project by projectId */
  projectById?: Maybe<Project>;
  /** Return details for a project */
  projectChatRoomDetails?: Maybe<Project>;
  /** Return messages for a ChatRoom by projectId */
  projectMessages?: Maybe<Array<Message>>;
  /** Returns all projects that are not disabled */
  projects?: Maybe<Array<Project>>;
  /** Return all projects by userId which are not disabled */
  projectsByUserId?: Maybe<Array<Project>>;
  /** Return all projects for the currently logged in user */
  projectsByloggedInUser?: Maybe<Array<Project>>;
  /** Returns all projects chatRooms */
  projectsChatRoom?: Maybe<ChatRoomResponse>;
  /** Returns the social data for the user that is currently logged in  */
  socialsByLoggedInUser: Social;
  /** Returns the social data for the user that is currently logged in  */
  socialsByUserId: Social;
  /** Returns a single user by ID */
  userById?: Maybe<User>;
  /** Returns all users/profiles except logged in user (if authenticated) */
  users?: Maybe<Array<User>>;
};


export type QueryContactChatRoomDetailsArgs = {
  id: Scalars['String'];
};


export type QueryContactMessagesArgs = {
  data: ChatInput;
};


export type QueryContactStatusArgs = {
  id: Scalars['String'];
};


export type QueryContactsChatRoomArgs = {
  data: SearchArgs;
};


export type QueryIsUserBlockedArgs = {
  id: Scalars['String'];
};


export type QueryNotificationsByLoggedInUserArgs = {
  data: PaginationArgs;
};


export type QueryProjectByIdArgs = {
  id: Scalars['String'];
};


export type QueryProjectChatRoomDetailsArgs = {
  id: Scalars['String'];
};


export type QueryProjectMessagesArgs = {
  data: ChatInput;
};


export type QueryProjectsArgs = {
  data: ProjectsFilterArgs;
};


export type QueryProjectsByUserIdArgs = {
  data: PaginationUserArgs;
};


export type QueryProjectsByloggedInUserArgs = {
  data: PaginationArgs;
};


export type QuerySocialsByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
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
  members: Array<Scalars['String']>;
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

export type AddContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddContactMutation = { __typename?: 'Mutation', addContact: { __typename?: 'Contact', id: string } };

export type BlockUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: boolean };

export type ContactAddMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type ContactAddMessageMutation = { __typename?: 'Mutation', contactAddMessage: { __typename?: 'Message', body: string } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: boolean };

export type DeleteImageMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteImageMutation = { __typename?: 'Mutation', deleteImage: { __typename?: 'Profile', profileImage?: string | null | undefined } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', username: string, profile?: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined } | null | undefined } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', username: string, profile?: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined } } };

export type RejectContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RejectContactMutation = { __typename?: 'Mutation', rejectContact: boolean };

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


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined, country?: string | null | undefined, bio?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } };

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

export type ContactStatusQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ContactStatusQuery = { __typename?: 'Query', contactStatus: Contact_Status };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries?: Array<{ __typename?: 'CountryResponse', key: string, country: string }> | null | undefined };

export type DisciplinesQueryVariables = Exact<{ [key: string]: never; }>;


export type DisciplinesQuery = { __typename?: 'Query', disciplines?: Array<{ __typename?: 'Discipline', id: number, title: string }> | null | undefined };

export type UsersQueryVariables = Exact<{
  data: UsersFilterArgs;
}>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string, profile?: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined, profileImage?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', title: string } | null | undefined } | null | undefined }> | null | undefined };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', email: string, username: string, profile?: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined, bio?: string | null | undefined, profileImage?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } | null | undefined, socials?: { __typename?: 'Social', instagram?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, behance?: string | null | undefined, soundcloud?: string | null | undefined, pinterest?: string | null | undefined, spotify?: string | null | undefined, medium?: string | null | undefined, vimeo?: string | null | undefined, youtube?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } | null | undefined } };

export type LoggedInSocialDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInSocialDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', socials?: { __typename?: 'Social', instagram?: string | null | undefined, linkedin?: string | null | undefined, dribbble?: string | null | undefined, behance?: string | null | undefined, soundcloud?: string | null | undefined, pinterest?: string | null | undefined, spotify?: string | null | undefined, medium?: string | null | undefined, vimeo?: string | null | undefined, youtube?: string | null | undefined, github?: string | null | undefined, discord?: string | null | undefined } | null | undefined } };

export type LoggedInProfileDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInProfileDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', profile?: { __typename?: 'Profile', firstName?: string | null | undefined, lastName?: string | null | undefined, bio?: string | null | undefined, country?: string | null | undefined, discipline?: { __typename?: 'Discipline', id: number, title: string } | null | undefined } | null | undefined } };

export type LoggedInAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInAccountDetailsQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', email: string, username: string } };

export type ProfileImageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileImageQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', profile?: { __typename?: 'Profile', profileImage?: string | null | undefined } | null | undefined } };

export type IsUserBlockedQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IsUserBlockedQuery = { __typename?: 'Query', isUserBlocked: boolean };

export type NewMessageSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'MessageSubscribtionResponse', body: string } };


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
    body
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
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      username
      profile {
        firstName
        lastName
        profileImage
      }
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
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(data: $data) {
    accessToken
    user {
      username
      profile {
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
export const UsersDocument = gql`
    query users($data: UsersFilterArgs!) {
  users(data: $data) {
    id
    username
    profile {
      firstName
      lastName
      profileImage
      country
      discipline {
        title
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
export const LoggedInUserDocument = gql`
    query loggedInUser {
  loggedInUser {
    email
    username
    profile {
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
    profile {
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
    profile {
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
export const NewMessageDocument = gql`
    subscription newMessage($id: String!) {
  newMessage(chatId: $id) {
    body
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;