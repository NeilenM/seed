import { Divider } from "@mui/material"
import AutocompleteForms from "sections/forms/validation/AutoCompleteForm"
import LoginForms from "sections/forms/validation/LoginForms"

const validations = () => {
  return (
    <div>
      <LoginForms/>
      <Divider/>
      <AutocompleteForms/>
    </div>
  )
}

export default validations
