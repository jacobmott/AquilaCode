export interface User {
  id?: string; // This is the id that mongoose will create
  name: string;
  connectionType: string; // google, facebook, etc
  connectionId: string; // This is the id that the external service will provide
  // password: string;
}
