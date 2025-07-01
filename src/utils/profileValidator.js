exports.artisanProfile = (profile) => {
  if (!profile) return false;
  return (
    profile.bio.trim() !== '' &&
    Array.isArray(profile.skills) &&
    profile.skills.length > 0 &&
    profile.location.trim() !== ''
  );
};

exports.customerProfile = (profile) => {
  if (!profile) return false;
  return (
    profile.address && profile.address.trim() !== '' &&
    profile.phone && profile.phone.trim() !== ''
  );
};
