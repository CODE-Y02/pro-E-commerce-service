export type getCategoryInputType = {
  id?: string | null;
  name?: string | null;
};

export interface CategoryInterface {
  _id: string;
  name?: string | null;
  description?: string | null;
}
