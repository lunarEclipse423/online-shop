import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Textarea from "./Textarea";

describe("Textarea", () => {
  test("Should render textarea", () => {
    // given
    const testTextareaProps = {
      classes: "textarea",
      name: "description",
      placeholder: "Type your description",
      value: "",
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        console.log(event);
      },
      errorMessage: "",
    };
    render(<Textarea {...testTextareaProps} />);
    const textarea = screen.getByPlaceholderText("Type your description");

    // then
    expect(textarea).toBeInTheDocument();
  });
});
