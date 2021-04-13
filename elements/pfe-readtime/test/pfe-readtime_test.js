const elements = [...document.querySelectorAll("pfe-readtime")];

suite("<pfe-readtime>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-readtime"),
            customElements.get("pfe-readtime"),
            "pfe-readtime should be an instance of pfeReadtime"
        );
    });


        // Write tests for each attribute

        // Write tests for each slot

        //if pfe-readtime has word-count attribute make sure it is getting that values
        //wpm is set to X expect readtime value to be Y
        test("it calculates readtime based on wordcount given", done => {
          const pfeReadtime = document.querySelector("#pfeReadtime");

          pfeReadtime.setAttribute("wpm", "100");

          assert.equal(pfeReadtime.readtime, "5");
          done();
        });

        test("that readtime is hidden if readtime is < 1", done => {
          const pfeReadtime = document.querySelector("#pfeReadtime");

          pfeReadtime.setAttribute("word-count", "0");

          assert.equal(pfeReadtime.shadowRoot.textContent, "");
          assert.isTrue(pfeReadtime.hidden);
          done();
        });


        test("if lang=zh that wpm and readtime update accordingly", done => {
          const langCode = document.querySelector("html").getAttribute("lang");
          const pfeReadtime = document.querySelector("#pfeReadtime");

          pfeReadtime.setAttribute("word-count", "158");

          langCode.setAttribute("lang", "zh");

          assert.equal(pfeReadtime.wpm, "158");
          assert.equal(pfeReadtime.readtime, "1");
          done();
        });

        //PfeReadtime.readtime
        //PfeReadtime.shadowRoot.textContent //to validate

        //go throught property object and make sure you test for all those things!

        //add test for custom template to make sure it comes through

        //if pfe-readtime does not have word-count value given make sure it is getting wordcount from section

        //if readtime is less than 1 make sure pfe-readtime is not visible

        //check the wpm-readtime updates for a couple different country codes


});
