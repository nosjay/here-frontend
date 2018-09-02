<template>
  <div :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
const ColBlockClass = 'h-grid__col';


export default {
  name: 'Col',
  props: {
    order: [String, Number],
    span: [String, Number],
    offset: [String, Number],
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
  },
  computed: {
    blockClasses() {
      const classes = [
        ColBlockClass,
        {
          [`${ColBlockClass}--order--${this.order}`]: this.order,
          [`${ColBlockClass}--span--${this.span}`]: this.span,
          [`${ColBlockClass}--offset--${this.offset}`]: this.offset,
        },
      ];

      ['xs', 'sm', 'md', 'lg'].forEach((size) => {
        if (typeof this[size] === 'number') {
          classes.push(`${ColBlockClass}__${size}--span--${this[size]}`);
        } else if (typeof this[size] === 'object') {
          const sizeProps = this[size];
          Object.keys(sizeProps).forEach((key) => {
            classes.push(`${ColBlockClass}__${size}--${key}--${sizeProps[key]}`);
          });
        }
      });

      return classes;
    },
  },
};
</script>
