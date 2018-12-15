import { Deserializable } from './deserializable.model';
// import { StringifyOptions } from "querystring";

export class Mobile implements Deserializable {
  // t.string "name"
  // t.text "description"
  // t.string "brand"
  // t.integer "price"
  // t.integer "ram"
  // t.float "screen_size"
  // t.string "sim_type"
  // t.float "primary_camera"
  // t.float "secondary_camera"
  // t.integer "battery"
  // t.string "slug", null: false
  // t.text "avatar"
  // t.datetime "created_at", null: false
  // t.datetime "updated_at", null: false

  public id: number;
  public name: string;
  public description: string;
  public brand: string;
  public price: number;
  public ram: string;
  public screen_size: number;
  public sim_type: string;
  public primary_camera: number;
  public secondary_camera: number;
  public battery: number;
  public slug: string;
  public avatar: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
