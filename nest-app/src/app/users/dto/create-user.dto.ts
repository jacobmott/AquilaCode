export class CreateUserDto {
  readonly name?: string;
  readonly connectionType?: string;
  readonly connectionInfo: string;
  // readonly password: string;
}
