import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FIeldError";
import { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "services/validator";
import s from "./style.module.css";

const VALIDATOR = {
  color: (value) => {
    return ValidatorService.min(value, 1) || ValidatorService.max(value, 20);
  },
  size: (value) => {
    return ValidatorService.min(value, 1);
  },
  inventory: (value) => {
    return ValidatorService.max(value, 6);
  },
  shirtName: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 100);
  },
  shirtPrice: (value) => {
    return ValidatorService.min(value, 1);
  },
  details: (value) => {
    return ValidatorService.max(value, 100) ;
  },
};

export function ProductForm({
  isEditable = true,
  product,
  shirtId,
  shirtName,
  shirtPrice,
  details,
  color,
  size,
  inventory,
  onClickEdit,
  onClickDelete,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    shirtId: product?.shirtId || "",
    shirtName: product?.shirtName || "",
    shirtPrice: product?.shirtPrice || "",
    details: product?.details || "",
    color: product?.color || "",
    size: product?.size || "",
    inventory: product?.inventory || "",
  });
  const [formErrors, setFormErrors] = useState({
    shirtName: product?.shirtName ? undefined : true,
    shirtPrice: product?.shirtPrice ? undefined : true,
    details: product?.details ? undefined : true,
    size: product?.size ? undefined : true,
    color: product?.color ? undefined : true,
    inventory: product?.inventory ? undefined : true,
  });

  const updateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  };

  const validate = (fieldName, fieldValue) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };

  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickDelete && (
          <TrashFill onClick={onClickDelete} className={s.icon} />
        )}
      </div>
    </>
  );
  const shirtNameInput = (
    <div className="mb-5">
      <label className="form-label">Shirt Name</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="shirtName"
        className="form-control"
        value={formValues.shirtName}
      />
      <FieldError msg={formErrors.shirtName} />
    </div>
  );
  const shirtPriceInput = (
    <div className="mb-5">
      <label className="form-label">Shirt Price</label>
      <textarea
        onChange={updateFormValues}
        type="number"
        name="shirtPrice"
        className="form-control"
        row="5"
        value={formValues.shirtPrice}
      />
      <FieldError msg={formErrors.shirtPrice} />
    </div>
  );
  const detailsInput = (
    <div className="mb-5">
      <label className="form-label">Details</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="details"
        className="form-control"
        row="5"
        value={formValues.details}
      />
      <FieldError msg={formErrors.details} />
    </div>
  );
  const colorInput = (
    <div className="mb-5">
      <label className="form-label">Color</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="color"
        className="form-control"
        value={formValues.color}
      />
      <FieldError msg={formErrors.color} />
    </div>
  );
  const sizeInput = (
    <div className="mb-5">
      <label className="form-label">Size</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="size"
        className="form-control"
        row="5"
        value={formValues.size}
      />
      <FieldError msg={formErrors.size} />
    </div>
  );
  const inventoryInput = (
    <div className="mb-5">
      <label className="form-label">Inventory</label>
      <textarea
        onChange={updateFormValues}
        type="number"
        name="inventory"
        className="form-control"
        row="5"
        value={formValues.inventory}
      />
      <FieldError msg={formErrors.inventory} />
    </div>
  );

  const submitBtn = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{shirtId}</h2>
        </div>
        {actionIcons}
      </div>
      <div className="mb-3">
        {isEditable ? shirtNameInput : <pre>{shirtName}</pre>}
      </div>
      <div className="mb-2">
        {isEditable ? shirtPriceInput : <pre>{shirtPrice}</pre>}
      </div>
      <div className="mb-3">
        {isEditable ? detailsInput : <pre>{details}</pre>}
      </div>
      <div className="mb-2">
        {isEditable ? colorInput : <pre>{color}</pre>}
      </div>
      <div className="mb-3">
        {isEditable ? sizeInput : <pre>{size}</pre>}
      </div>
      <div className="mb-2">
        {isEditable ? inventoryInput : <pre>{inventory}</pre>}
      </div>
      {onSubmit && submitBtn}
    </div>
  );
}
