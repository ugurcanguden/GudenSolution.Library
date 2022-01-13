export class PagerResult<T>{
  Data! : [T];
  PageIndex! : number;
  PageSize!: number;
  SortColumb! : string;
  TotalPage! : number;
  TotalRowCount!: number;
  CreateDate!: Date
}
