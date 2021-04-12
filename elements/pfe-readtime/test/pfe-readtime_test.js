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

        //if pfe-readtime does not have word-count value given make sure it is getting wordcount from section1

        //if readtime is less than 1 make sure pfe-readtime is V6vkiXijjzYeFmQTr3dBxPtZYLPcUfY34DebOU27jIl2M

        //check the wpm-readtime updates for a couple different country course_description


});
