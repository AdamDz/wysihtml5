/**
 * Sandbox that uses div rather than iframe (so is not really a sandbox).
 */
(function(wysihtml5) {
  var /**
       * Default configuration
       */
      doc                 = document,
      /**
       * Properties to unset/protect on the window object
       */
      windowProperties    = [
        "parent", "top", "opener", "frameElement", "frames",
        "localStorage", "globalStorage", "sessionStorage", "indexedDB"
      ],
      /**
       * Properties on the window object which are set to an empty function
       */
      windowProperties2   = [
        "open", "close", "openDialog", "showModalDialog",
        "alert", "confirm", "prompt",
        "openDatabase", "postMessage",
        "XMLHttpRequest", "XDomainRequest"
      ],
      /**
       * Properties to unset/protect on the document object
       */
      documentProperties  = [
        "referrer",
        "write", "open", "close"
      ];
  
  wysihtml5.dom.NullSandbox = Base.extend(
    /** @scope wysihtml5.dom.NullSandbox.prototype */ {

    constructor: function(readyCallback, container, config) {
      this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
      this.config   = wysihtml5.lang.object({}).merge(config).get();
      this.iframe   = container;
      
      this.loaded = true;

      // Trigger the callback
      var that = this;
      setTimeout(function() { that.callback(that); }, 0);
    },
    
    insertInto: function(element) {
      if (typeof(element) === "string") {
        element = doc.getElementById(element);
      }
      
      element.appendChild(this.iframe);
    },

    getIframe: function() {
      return this.iframe;
    },

    getWindow: function() {
      return window;
    },

    getDocument: function() {
      return window.document;
    },

    destroy: function() {
      var iframe = this.getIframe();
      //iframe.parentNode.removeChild(iframe);
    }
    
  });
})(wysihtml5);
