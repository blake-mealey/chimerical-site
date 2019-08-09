class DateModel {
  constructor(dateTime, title, options = {}) {
    this.dateTime = dateTime;
    this.title = title;

    this.formatted = new Date(this.dateTime).toLocaleDateString(`en-US`, {
      month: `long`,
      year: `numeric`,
      ...options
    });
  }
};

export default DateModel;
