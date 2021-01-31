import Revision from "./Revision.js";
export default class RevisionsManager {
  // loads from db, saves to db
  constructor() {
    this.m_loadedRevisions = [];
    this.loadRevisions(this.m_loadedRevisions);
  }

  loadRevisions(loadedRevisions) {
    // todo: load from DB
    loadedRevisions.push(new Revision(1, "Fatiha", 10, 1, 7, 1000));
    loadedRevisions.push(new Revision(2, "Najm", 0, 4785, 4846, 2));
    loadedRevisions.push(new Revision(3, "Mulk", 1, 5242, 5271, 7));
    loadedRevisions.push(new Revision(4, "AlKawthar", 50, 6205, 6207, 5));
    loadedRevisions.push(new Revision(5, "Ikhlas", 80, 6222, 6225, 12));
    loadedRevisions.push(new Revision(6, "Az-Zumar", 50, 4059, 4133, 12));
    loadedRevisions.push(new Revision(7, "Ghaafir", 30, 4134, 4218, 3));
    loadedRevisions.push(new Revision(8, "Fussilat", 20, 4219, 4272, 1));
    loadedRevisions.push(new Revision(9, "Ash-Shura", 0, 4273, 4325, 0));
    loadedRevisions.push(new Revision(10, "Az-Zukhruf", 70, 4326, 4414, 2));
    loadedRevisions.push(new Revision(11, "Ad-Dukhaan", 35, 4415, 4473, 22));
    loadedRevisions.push(new Revision(12, "Al-Jaathiya", 48, 4474, 4510, 5));
    loadedRevisions.push(new Revision(13, "Al-Ahqaf", 79, 4511, 4545, 7));
    loadedRevisions.push(new Revision(14, "Muhammad", 95, 4546, 4583, 44));
    loadedRevisions.push(new Revision(15, "Al-Fath", 90, 4584, 4612, 42));
    loadedRevisions.push(new Revision(16, "Al-Hujuraat", 99, 4613, 4630, 11));
    loadedRevisions.push(
      new Revision(18, "123456789012345678901234567890", 99, 4613, 4630, 235)
    );
    loadedRevisions.push(new Revision(17, "Qaaf", 13, 4631, 4675, 4));
  }
}
