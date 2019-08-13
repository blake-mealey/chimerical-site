import React from "react"
import CardList from "./primitives/card-list"
import Card from "./primitives/card"
import marked from "marked"

export class CardDetails {
  constructor({ id, title, tags, dates, links, description }) {
    this.id = id
    this.title = title
    this.tags = tags
    this.dates = dates
    this.links = links
    this.description = marked(description)
  }

  compare(other) {
    const thisDate = this.dates[this.dates.length - 1]
    const otherDate = other.dates[other.dates.length - 1]
    return thisDate > otherDate ? -1 : thisDate < otherDate ? 1 : 0
  }
}

export const CardDetailsView = ({items}) => (
  <CardList>
    {items.map(item => (
      <Card id={item.id}
            title={item.title}
            tags={item.tags}
            dates={item.dates}
            links={item.links}>
        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
      </Card>
    ))}
  </CardList>
);
