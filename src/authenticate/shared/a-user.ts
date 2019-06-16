import {Exclude, Expose, Transform, Type} from "class-transformer";
import {User} from "./user.interface";

@Exclude()
export class UserEntity {
  @Expose()
  @Type(value => String)
  @Transform(value => value && value.toString())
  _id: string;
  @Expose()
  username: string;
  @Expose()
  avatar: string;
  @Expose({ groups: ['admin'] })
  phone: string;
  @Expose()
  rights: number;
  @Expose()
  email: string;
  @Expose()
  tickets: number;
  @Expose()
  premium: string;
}

export class AUser extends UserEntity {
  private creator: boolean = false;

  public setCreator(userId: string) {
    this.creator = this._id.toString() === userId.toString();
  }

  constructor(user: UserEntity | User) {
    super();

    this._id = user._id;
    this.username = user.username;
    this.phone = user.phone;
    this.rights = user.rights;
    this.email = user.email;
    this.tickets = user.tickets || 0;
    this.avatar = user.avatar;
  }

  public isCreator(userId?: string) {
    return (userId && userId.toString() == this._id.toString()) || this.creator || this.isJudje();
  }

  public isJudje() {
    return this.rights == 2 || this.isAdmin();
  }

  public isAdmin() {
    return this.rights == 5 || this.isSuperAdmin();
  }

  public isSuperAdmin() {
    return this.rights == 10;
  }
}
