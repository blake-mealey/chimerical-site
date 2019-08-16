import marked from "marked"

class CardDetails {
  constructor({ id, title, tags, dates, links, description }) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.dates = dates;
    this.links = links;
    this.description = marked(description);
  }

  compare(other) {
    const thisTime = this.dates[this.dates.length - 1].time;
    const otherTime = other.dates[other.dates.length - 1].time;
    return thisTime > otherTime ? -1 : thisTime < otherTime ? 1 : 0;
  }
}

export default CardDetails;