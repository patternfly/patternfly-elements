export default function prop2attr(prop, prefix) {
  // TODO implement rules for prop names.  such as, it must begin with a lowercase letter or underscore.  and after the first letter, can contain only numbers, underscores, and upper- or lower-case letters.  and cannot end with an underscore.
  if (!/^[a-z_]/.test(prop))
    throw new Error(
      `Prop "${prop}" defined, but prop names must begin with a lower-case letter or an underscore`
    );
  return (
    prefix +
    prop
      .replace(/^[A-Z]/, l => l.toLowerCase())
      .replace(/[A-Z]/, l => `-${l.toLowerCase()}`)
  );
}
