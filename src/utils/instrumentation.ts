import { EditorProps } from "../types/aem";

/**
 * Generates Universal Editor attributes for a component or property.
 */
export function getEditorProps(
  resource?: string | null,
  type?: string,
  options: {
    prop?: string;
    model?: string;
    label?: string;
    filter?: string;
    behavior?: string;
    component?: string;
  } = {}
): EditorProps {
  const props: EditorProps = {};

  if (resource) props["data-aue-resource"] = resource;
  if (type) props["data-aue-type"] = type;
  if (options.prop) props["data-aue-prop"] = options.prop;
  if (options.model) props["data-aue-model"] = options.model;
  if (options.label) props["data-aue-label"] = options.label;
  if (options.filter) props["data-aue-filter"] = options.filter;
  if (options.behavior) props["data-aue-behavior"] = options.behavior;
  if (options.component) props["data-aue-component"] = options.component;

  return props;
}

/**
 * Generates EditorProps for a Content Fragment reference.
 */
export function getCFProps(fragmentPath: string | null | undefined, label: string = "Content Fragment"): EditorProps {
  if (!fragmentPath) return {};
  return getEditorProps(`urn:aemconnection:${fragmentPath}/jcr:content/data/master`, "reference", {
    filter: "cf",
    label
  });
}
