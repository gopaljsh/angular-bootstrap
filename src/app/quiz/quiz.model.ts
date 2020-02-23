export interface Quiz {
    question: string;
    answeroption: {a:string, b:string, c:string, d:string};
    correctanswer: string;
    incorrect: boolean;
}