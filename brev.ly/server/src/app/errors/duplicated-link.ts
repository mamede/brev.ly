export class DuplicateLink extends Error {
  constructor() {
    super('Link already exists');
  }
}