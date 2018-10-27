<template>
  <form :class="blockClasses">
    <slot></slot>
  </form>
</template>

<script>
import { has } from '../../utils/assist';

const formBlockClass = 'h-form';


export default {
  name: 'Form',
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelIn: {
      validator(value) {
        return has(value, ['left', 'right', 'top']);
      },
      default: 'right',
    },
  },
  computed: {
    blockClasses() {
      return [
        formBlockClass,
        `${formBlockClass}--label-${this.labelIn}`,
        {
          [`${formBlockClass}--inline`]: this.inline,
        },
      ];
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  provide() {
    return { form: this };
  },
  methods: {
    validate(callback) {
      return new Promise((resolve) => {
        let status = true;

        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              status = false;
            }
          });
        });

        resolve(status);
        if (typeof callback === 'function') {
          callback(status);
        }
      });
    },
    resetFields() {
      this.fieldValue.forEach((field) => {
        field.reset();
      });
    },
  },
  watch: {
    rules() {
      this.validate();
    },
  },
  created() {
    this.$on('add-form-item', (field) => {
      if (field) {
        this.fields.push(field);
      }
      return false;
    });

    this.$on('remove-form-item', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
      return false;
    });
  },
};
</script>

<style lang="scss">
@import '../../styles/components/form';
</style>
