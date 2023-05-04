import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FIeldError";
import { useState } from "react";
import { PencilFill} from "react-bootstrap-icons";
import { ValidatorService } from "services/validator";
import s from "./style.module.css";

const VALIDATOR = {
  userName: (value) => {
    return ValidatorService.min(value, 1) || ValidatorService.max(value, 20);
  },
  userAddress: (value) => {
    return ValidatorService.min(value, 1);
  },
  cartId: (value) => {
    return ValidatorService.min(value, 1);
  },
  total: (value) => {
    return ValidatorService.min(value, 1);
  },
  
};

export function PurchaseOrderForm({
  isEditable = true,
  purchaseOrder,
  userName,
  userAddress,
  total,
  cartId,
  onClickEdit,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    userName: purchaseOrder?.userName || "",
    userAddress: purchaseOrder?.userAddress || "",
    total: purchaseOrder?.total || "",
    cartId: purchaseOrder?.cartId || "",
  });
  const [formErrors, setFormErrors] = useState({
    userName: purchaseOrder?.userName ? undefined : true,
    userAddress: purchaseOrder?.userAddress ? undefined : true,
    total: purchaseOrder?.total ? undefined : true,
    cartId: purchaseOrder?.cartId ? undefined : true,
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
    </>
  );
  const userNameInput = (
    <div className="mb-5">
      <label className="form-label">Customer Name</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="userName"
        className="form-control"
        value={formValues.userName}
      />
      <FieldError msg={formErrors.userName} />
    </div>
  );
  const userAddressInput = (
    <div className="mb-5">
      <label className="form-label">Customer Address</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="userAddress"
        className="form-control"
        row="5"
        value={formValues.userAddress}
      />
      <FieldError msg={formErrors.userAddress} />
    </div>
  );
  const totalInput = (
    <div className="mb-5">
      <label className="form-label">Total Price</label>
      <textarea
        onChange={updateFormValues}
        type="number"
        name="total"
        className="form-control"
        row="5"
        value={formValues.total}
      />
      <FieldError msg={formErrors.total} />
    </div>
  );
  const cartIdInput = (
    <div className="mb-5">
      <label className="form-label">Cart ID</label>
      <input
        onChange={updateFormValues}
        type="number"
        name="cartId"
        className="form-control"
        value={formValues.cartId}
      />
      <FieldError msg={formErrors.cartId} />
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
        {actionIcons}
      </div>
      <div className="mb-3">
        {isEditable ? userNameInput : <pre>{userName}</pre>}
      </div>
      <div className="mb-2">
        {isEditable ? userAddressInput : <pre>{userAddress}</pre>}
      </div>
      <div className="mb-3">
        {isEditable ? totalInput : <pre>{total}</pre>}
      </div>
      <div className="mb-2">
        {isEditable ? cartId : <pre>{cartId}</pre>}
      </div>
      {onSubmit && submitBtn}
    </div>
  );
}
