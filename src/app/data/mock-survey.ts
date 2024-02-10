import {JsonFormData} from "../models/json-form-data.interface";

export const mockSurvey: JsonFormData = {
  "controls": [
    {
      "name": "firstName",
      "label": "First name:",
      "value": "",
      "type": "text",
      "validators": {
        "required": true,
        "minLength": 10
      }
    },
    {
      "name": "lastName",
      "label": "Last name:",
      "value": "",
      "type": "text",
      "validators": {}
    },
    {
      "name": "comments",
      "label": "Comments",
      "value": "",
      "type": "textarea",
      "validators": {}
    },
    {
      "name": "agreeTerms",
      "label": "This is a checkbox?",
      "value": "false",
      "type": "checkbox",
      "validators": {
        requiredTrue: true
      }
    },
    {
      "name": "size",
      "label": "",
      "value": "",
      "type": "range",
      "options": {
        "min": "0",
        "max": "100",
        "step": "1",
        "icon": "sunny"
      },
      "validators": {}
    },
    {
      "name": "lightDark",
      "label": "Do you like toggles?",
      "value": "false",
      "type": "toggle",
      "validators": {}
    }
  ]
}
