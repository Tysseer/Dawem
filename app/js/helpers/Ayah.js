// for each ayah the return is ayah global index, ayah local index, text,
// surah name and basmalah will be included in the array as a separate ayah with the id = 7000 for surah name and id=7001 for basmallah
// when id = -1 then the index id the index of the surah, there will be an extra "info" member with some data about the surah
export default class Ayah {
  constructor(id = 0, index = 0, text = "") {
    this.id = id;
    this.index = index;
    this.text = text;
  }

  getType() {
    if (this.id == 7000) return "Surah";
    if (this.id == 7001) return "Basmalah";
    if (this.id < 1 || this.id > 6236) return "Unkown";
    return "Ayah";
  }
}
