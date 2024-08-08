# Date Picker

The Date Picker component lets users choose dates within a set range defined by both a minimum and maximum date. This feature makes it easy for users to select dates that fall within the specified limits

## Usage

The date-picker component includes an input field for entering dates, a toggle for opening and closing the calendar, and a popup calendar interface for selecting dates.

```html
  <section>
    <h2>Date Format</h2>
    <pre><code>&lt;pf-date-picker date-format-input="YYYY-DD-MM"&gt;&lt;/pf-date-picker&gt;</code></pre>
    <pf-date-picker date-format-input="YYYY-DD-MM"></pf-date-picker>
    <p>The date picker supports the following 12 date formats:</p>
    <p><span>'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM', 'DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD',
       'YYYY-DD-MM', 'DD.MM.YYYY', 'MM.DD.YYYY', 'YYYY.MM.DD', 'YYYY.DD.MM'</span></p>
    <p>The date format is set globally, independent of the user's locale. 
      This means that all users will see the same date format, regardless of their language or region.</p>
  </section>

  <section>
    <h2>Set Input Date</h2>
    <pre><code>&lt;pf-date-picker input-date=${new Date(2023, 0, 1)}&gt;&lt;/pf-date-picker&gt;</code></pre>
    <!-- ***** The value for inputDate must be passed as **DATE TYPE** from parent component (Here the value is passed as string type 
      for demo purpose, as there are some restrictions for adding Date type value in .html file). -->
    <pf-date-picker input-date="Sun Jan 01 2023 05:30:00 GMT+0530 (India Standard Time)"></pf-date-picker>
    <p>The default date value can be passed to the date picker to set the initial date that is displayed.</p>
    <p>In the above given example, the date set to be displayed initially is <span>January 1, 2023</span>.</p>
  </section>

  <section>
    <h2>Disabled</h2>
    <pre><code>&lt;pf-date-picker disabled="true"&gt;&lt;/pf-date-picker&gt;</code></pre>
    <pf-date-picker disabled="true"></pf-date-picker>
    <p>The <span>disabled</span> attribute can be used to disable the date picker.</p>
  </section>

  <section>
    <h2>Localization</h2>
    <pre><code>&lt;pf-date-picker localization-language-code="fi"&gt;&lt;/pf-date-picker&gt;</code></pre>
    <pf-date-picker localization-language-code="fi"></pf-date-picker>
    <p>The locale string can be passed to the date picker to set the date format.</p>
    <p>In the above given example, the locale is set to <span>Finnish: fi</span></p>
    <p>The date format is set globally, independent of the user's locale. 
      This means that all users will see the same date format, regardless of their language or region.</p>
  </section>

  <section>
    <h2>Set minimum and maximum date range</h2>
    <pre><code>&lt;pf-date-picker min-date=${new Date(2023, 0, 2)} max-date=${new Date(2023, 0, 20)} 
      inputDate=${new Date(2023, 0, 3)}&gt;&lt;/pf-date-picker&gt;</code></pre>
    <!-- ***** The values for minDate and maxDate must be passed as **DATE TYPE** from parent component (Here the values are passed as string type 
      for demo purpose, as there are some restrictions for adding Date type value in .html file). -->
    <pf-date-picker 
      inputDate="Tue Jan 03 2023 05:30:00 GMT+0530 (India Standard Time)"
      min-date="Mon Jan 02 2023 00:00:00 GMT+0530 (India Standard Time)"
      max-date="Fri Jan 20 2023 00:00:00 GMT+0530 (India Standard Time)">
    </pf-date-picker>
    <p>The minimum and maximum valid dates can be passed to the date picker to restrict the range of dates that can be selected</p>
    <p>In the above given example, the minimum valid date 
      is <span>January 2, 2023</span>, and the maximum valid date is <span>January 20, 2023</span></p>
  </section>

  <section>
    <h2>Basic</h2>
    <pre><code>&lt;pf-date-picker&gt;&lt;/pf-date-picker&gt;</code></pre>
    <pf-date-picker></pf-date-picker>
    <p>The basic date picker will use the user's locale to determine the date format. The default minimum valid date 
      is <span>January 1, 1900</span>, and the default maximum valid date is <span>December 31, 9999</span>.</p>
  </section>

  <section>
    <h2>Translation</h2>
    <pre><code>&lt;pf-date-picker translation-language-code="fr"&gt;&lt;/pf-date-picker&gt;</code></pre>
    <pf-date-picker translation-language-code="fr"></pf-date-picker>
    <p>The translation language string can be passed to the date picker to localize the month names.</p>
    <p>In the above given example, the language is set to <span>French: fr</span></p>
  </section>
```

