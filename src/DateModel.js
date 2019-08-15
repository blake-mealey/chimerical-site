class DateModel {
  constructor(dateTime, title, formatted, options = {}) {
    this.dateTime = dateTime;
    this.title = title;

    this.formatted = formatted || new Date(this.dateTime).toLocaleDateString(`en-US`, {
      month: `long`,
      year: `numeric`,
      ...options
    });
  }
};

export default DateModel;
