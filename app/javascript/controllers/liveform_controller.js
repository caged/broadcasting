import { Controller } from "@hotwired/stimulus";
import { FormObserver } from "@form-observer/core";

// Connects to data-controller="liveform"
export default class extends Controller {
  connect() {
    console.log("Connected");
    const form = this.element;

    this.observer = new FormObserver("focusout", (event) => {
      event.target.setAttribute("data-visited", String(true));
      form.requestSubmit();
    });

    form.addEventListener("submit", this.handleSubmit.bind(this));
    this.observer.observe(this.element);
  }

  handleSubmit(event) {
    this.observer.disconnect();
  }

  disconnect() {
    console.log("Disconnected");
    this.observer.disconnect();
  }
}
