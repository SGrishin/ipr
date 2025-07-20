// type NewType = {
//     [Key in Keys]: Type;
// };

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type MyOmit<T, K extends keyof any> = {
    [P in Exclude<keyof T, K>]: T[P];
};

interface User {
    name: string;
    age: number;
    email: string;
}

type UserNameAndAge = MyPick<User, "name" | "age">; // { name: string; age: number }
type UserWithoutEmail = MyOmit<User, "email">;      // { name: string; age: number }

type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

interface User {
    name: string;
    age: number;
}

const partialUser: MyPartial<User> = {
    name: "Alice", // age можно не указывать
};