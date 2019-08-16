class DateModel {
  constructor(dateTime, title, formatted, options = {}) {
    const date = new Date(dateTime);
    console.log(formatted, date.getTime());

    this.dateTime = dateTime;
    this.title = title;
    this.time = date.getTime();

    this.formatted = formatted || date.toLocaleDateString(`en-US`, {
      month: `long`,
      year: `numeric`,
      ...options
    });
  }
};

export default DateModel;
