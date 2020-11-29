class CircularLinkList {
  constructor(firstData) {
    this.current = {
      data: firstData,
    };
    this.current.previous = this.current;
    this.current.next = this.current;
  }
  insertAfter(newNode) {
    newNode.previous = this.current;
    newNode.next = this.current.next;
    this.current.next.previous = newNode;
    this.current.next = newNode;
  }
  removeBefore() {
    const data = this.current.previous.data;
    this.current.previous = this.current.previous.previous;
    this.current.previous.next = this.current;
    return data;
  }
  goNext() {
    this.current = this.current.next;
  }
  goPrevious() {
    this.current = this.current.previous;
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
