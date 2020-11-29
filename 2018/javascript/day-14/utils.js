class CircularLinkList {
  constructor(firstData) {
    this.current = {
      data: firstData,
    };
    this.current.next = this.current;
    this.last = this.current;
  }
  insertAfterLast(data) {
    const newLast = {
      data,
    };
    const exLast = this.last;
    newLast.next = exLast.next;
    exLast.next = newLast;
    this.last = newLast;
  }
  goNext() {
    this.current = this.current.next;
  }
  getListLog() {
    let log = `(${this.current.data})`;
    if (this.current.next !== this.current) {
      let currentLogged = this.current.next;
      do {
        log = `${log} ${currentLogged.data}`;
        currentLogged = currentLogged.next;
      } while (currentLogged !== this.current);
    }
    return log;
  }
}

module.exports = {
  CircularLinkList,
};
