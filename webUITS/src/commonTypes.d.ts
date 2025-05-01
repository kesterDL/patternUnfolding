export type ObjectType = "Place" | "Person" | "Thing";

export type Pattern = {
  [key: string]: {
    name: string;
    type: ObjectType;
    people: string[];
    places: string[];
    role?: string;
    things?: { [key: string]: any };
    descriptor?: string;
  };
};

export type UserData = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  username: string;
};
