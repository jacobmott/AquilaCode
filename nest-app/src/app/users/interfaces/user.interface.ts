export interface User {
  name: string;
  connectionType: string; // google, facebook, etc
  connectionId: string; // This is the id that the external service will provide
  // password: string;
}
