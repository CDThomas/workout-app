# TODO: Might be a better way to do this within AMS
module ErrorSerializer

  def self.serialize(errors)
    return if errors.nil?

    {}.tap do |json|
      new_hash = errors.to_hash(true).map do |k, v|
        v.map do |msg|
          { message: msg }
        end
      end.flatten
      json[:errors] = new_hash
    end
  end
end
