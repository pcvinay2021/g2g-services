const specialDays = {
  "01-01": {
    occasion: "New Year",
    category: "Celebration",
    message:
      "Wishing you a successful, safe and prosperous New Year from G2G Services."
  },

  "01-26": {
    occasion: "Republic Day",
    category: "National",
    message:
      "Let us celebrate the spirit of our Constitution, unity and freedom. Happy Republic Day!"
  },

  "05-01": {
    occasion: "Labour Day",
    category: "Awareness",
    message:
      "Saluting the dedication, hard work and contribution of every worker. Happy Labour Day!"
  },

  "06-05": {
    occasion: "World Environment Day",
    category: "Awareness",
    message:
      "Protect our environment today for a safer and greener tomorrow."
  },

  "08-15": {
    occasion: "Independence Day",
    category: "National",
    message:
      "Celebrating the spirit of freedom, unity and progress. Happy Independence Day!"
  },

  "09-05": {
    occasion: "Teachers' Day",
    category: "Awareness",
    message:
      "Celebrating the teachers who inspire, guide and shape our future."
  },

  "10-02": {
    occasion: "Gandhi Jayanti",
    category: "National",
    message:
      "Remembering the values of truth, peace and non-violence."
  },

  "11-14": {
    occasion: "Children's Day",
    category: "Awareness",
    message:
      "Every child is a promise of a brighter and better tomorrow."
  },

  "12-25": {
    occasion: "Christmas",
    category: "Celebration",
    message:
      "Wishing you peace, happiness and prosperity. Merry Christmas!"
  }
};

function getTodaySpecialDay() {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const key = `${month}-${day}`;

  return (
    specialDays[key] || {
      occasion: "G2G Services Daily Awareness",
      category: "Business",
      message:
        "Smart technology, reliable infrastructure and better security for a connected tomorrow."
    }
  );
}

module.exports = {
  specialDays,
  getTodaySpecialDay,
};