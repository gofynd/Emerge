<template>
  <fdk-pincode
    ref="pdpPincode"
    :style="global_config ? 'color:' + global_config.props.text_body_color : ''"
  >
    <template slot-scope="pincodeAction">
      <div class="delivery-info">
        <h4 class="delivery-label b2">Select delivery location</h4>
        <div class="delivery" v-if="isMounted">
          <input
            ref="deliveryPincode"
            autocomplete="off"
            v-model="pincode_value"
            placeholder="Please enter PIN code to check delivery time"
            class="common-input pincode-input font-body"
            type="tel"
            maxlength="6"
            onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
          />
          <button
            class="button btn-secondary font-body"
            @click="checkPincode(pincodeAction)"
          >
            <span class="flex-align-center"> CHECK </span>
          </button>
          <!-- <span class="darker-xs">Delivery to {{ getPincode() }}</span>
          <span>
            <a

              class="ukt-links"
              style="color: var(--text_heading_link_color)"
              @click="addressModal = true"
              >&nbsp;Edit Pincode</a
            >
          </span> -->
        </div>
        <div v-if="pincodeError && showError">
          <p class="error light-xxs">
            <svg-wrapper
              :svg_src="`error-standard-line`"
              class="error-standard"
            ></svg-wrapper>
            {{ pincodeErrorMessage }}
          </p>
        </div>
        <div class="caption-normal error" v-else-if="selectPincodeError">
          {{ "PIN code is mandatory" }}
        </div>
        <template
          v-if="
            storeInfo &&
            deliveryInfo &&
            deliveryInfo.minDeliveryDate &&
            !error &&
            !pincodeError &&
            pincode_value
          "
        >
          <div
            v-if="deliveryInfo.minDeliveryDate === deliveryInfo.maxDeliveryDate"
          >
            <div class="delivery-date light-xxs">
              <svg-wrapper :svg_src="'delivery-truck'" /> Expected delivery on
              {{ deliveryInfo.minDeliveryDate }}
            </div>
          </div>
          <div v-else>
            <div class="delivery-date light-xxs">
              <svg-wrapper :svg_src="'delivery-truck'" /> Expected delivery
              between
              {{ deliveryInfo.minDeliveryDate }}
              -
              {{ deliveryInfo.maxDeliveryDate }}
            </div>
          </div>
        </template>
      </div>
    </template>
  </fdk-pincode>
</template>

<style lang="less" scoped>
.delivery {
  margin-bottom: 8px;
  display: flex;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
}
.delivery-info {
  margin: 20px 0px 0px 0px;
  .delivery-label {
    margin-bottom: 0.5rem;
    color: black;
  }
  .ukt-links {
    .user-select-none();
    font-size: 15px;
  }
}
.delivery-date {
  color: #1c958f;
  display: flex;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.24px;
}
.error {
  color: #d28f51;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-align: left;
  display: flex;
}

.error-standard {
  margin-right: 4px;
}

.pincode-input {
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  width: 100%;
  text-overflow: ellipsis;
}

.button {
  background: none;
  border: none;
  padding: 0 1rem;
  cursor: pointer;
  & > span {
    border-bottom: 1px solid black;
  }
}
</style>

<script>
import AddressList from "./address-list-modal.vue";
import isEmpty from "lodash/isEmpty";
import SvgWrapper from "../common/svg-wrapper.vue";

export default {
  name: "delivery-info",
  props: {
    storeInfo: {},
    productName: "",
    level: "",
    id: {
      type: Number,
    },
    context: {},
    showUserPincodeModal: "",
    isExplicitelySelectedStore: "",
    pincode: "",
    pincodeErrorMessage: "",
    pincodeError: { type: Boolean, default: false },
    selectPincodeError: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    storeInfo() {
      if (this.storeInfo) {
        this.fromPincode = `${this.storeInfo.pincode}`;
        this.toPincode = this.pincode;
        this.getTatInfo();
      }
    },
    deliveryInfo(newValue) {
      this.deliveryInfo = newValue;
    },
    pincode_value(newVal) {
      this.$emit("changeCurrentPincodeValue", newVal);
      this.$emit("disableSelectPincodeError", false);
      this.deliveryInfo = {};
      if (newVal.length === 0) {
        this.$emit("hidePincodeError");
        return;
      }
      const reg = new RegExp(/^(?=.{6}$)[a-z0-9]+([ -]?[a-z0-9]+)*$/i);
      if (!reg.test(newVal)) {
        this.$emit("onPincodeError");
      } else {
        this.$emit("hidePincodeError");
      }
    },
  },
  data() {
    return {
      pincode_value: "",
      toPincode: this.pincode || "",
      fromPincode: "",
      addressModal: false,
      tatInfo: {},
      deliveryInfo: {},
      error: false,
      isMounted: false,
      pincodeFunction: null,
    };
  },
  components: {
    "address-list-modal": AddressList,
    "svg-wrapper": SvgWrapper,
  },
  mounted() {
    this.isMounted = true;
    this.pincode_value = this.pincode;
    if (!this.showUserPincodeModal && !isEmpty(this.storeInfo))
      this.getTatInfo();
  },
  methods: {
    onCloseDialog() {
      this.$emit("togglePincodeError", false);
      this.addressModal = false;
      this.$emit("dialogClosed");
    },
    getPincode() {
      return this.toPincode;
    },
    showTatError(err) {
      this.$emit("showTatError", err.message);
    },
    onTatError(err) {
      this.showTatError(err);
    },
    onHideTatError() {
      this.$emit("hideTatError");
    },
    onNewPincodeReceived(obj) {
      let newPincode = obj.pincode_value;
      this.pincodeFunction = obj.pincode_act;
      this.toPincode = newPincode;
      this.$emit("pincodeChanged", newPincode);
    },
    getTatInfo() {
      if (this.storeInfo && this.$refs["pdpPincode"] && this.toPincode) {
        this.tatInfo = {
          toPincode: this.toPincode,
          fromPincode: `${this.storeInfo.pincode}`,
          categoryId: this.id,
          store_id: this.storeInfo.store.uid,
        };
        this.$refs["pdpPincode"]
          ?.getTat(this.tatInfo)
          .then((res) => {
            this.deliveryInfo = res;
          })
          .catch((err) => {
            this.$emit("togglePincodeError", true);
            this.$emit("showTatError", err.message);
            this.$emit("onPincodeError", err.message);
            this.isPinCodeValid = false;
          });
      }
    },
    checkPincode(pincodeAct) {
      this.$emit("disableSelectPincodeError", false);
      this.pincodeFunction = pincodeAct;
      if (this.pincode_value.length === 6) {
        return pincodeAct
          .validatePincode(this.pincode_value)
          .then((valid) => {
            if (valid) {
              this.$emit("hidePincodeError");
              this.showError = false;
              this.error = "";
              this.pincodeError = false;
              const pincodeData = {
                pincode_value: this.pincode_value,
                pincode_act: pincodeAct,
              };
              this.onNewPincodeReceived(pincodeData);
              this.$emit("hideTatError");
            } else {
              throw {
                message: "Something went wrong",
              };
            }
            return true;
          })
          .catch((err) => {
            this.showTatError(err);
            this.pincodeError = true;
            this.$emit("onPincodeError", err.message);
            this.error = err.message;
            return false;
          });
      }
    },
    changePincode() {
      if (this.pincode_value && this.pincode_value.length === 6) {
        this.pincode_value = "";
        this.pincodeErrorMessage = "";
        this.pincodeError = false;
      }
    },
  },
  computed: {
    buttonLabel() {
      if (this.pincode_value && this.pincode_value.length === 6) {
        return "CHANGE";
      }

      return "CHECK";
    },
  },
};
</script>
