# Transform JSON request param keys from JSON-conventional camelCase to
# Rails-conventional snake_case.
# See:
# - http://stackoverflow.com/questions/17240106/what-is-the-best-way-to-convert-all-controller-params-from-camelcase-to-snake-ca/30557924#30557924
# - https://github.com/rails/rails/pull/20389
ActionDispatch::Request.parameter_parsers[:json] = -> (raw_post) {
  # Modified from action_dispatch/http/parameters.rb
  data = ActiveSupport::JSON.decode(raw_post)
  data = {:_json => data} unless data.is_a?(Hash)

  # Transform camelCase param keys to snake_case:
  data.deep_transform_keys!(&:underscore)
}
