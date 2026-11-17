(function () {
    const prayerNames = {
        fajr: "الفجر",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء"
    };

    const alerted = new Set();

    function checkPrayerTimes() {
        const savedTimes = localStorage.getItem("prayerTimes");

        if (!savedTimes) return;

        let times;

        try {
            times = JSON.parse(savedTimes);
        } catch {
            return;
        }

        const now = new Date();
        const currentTime =
            String(now.getHours()).padStart(2, "0") + ":" +
            String(now.getMinutes()).padStart(2, "0");

        const today = now.toDateString();

        for (const key in prayerNames) {
            const alertKey = today + "-" + key;

            if (
                times[key] === currentTime &&
                !alerted.has(alertKey)
            ) {
                alerted.add(alertKey);

                alert(
                    "حان الآن وقت صلاة " +
                    prayerNames[key] +
                    " 🌿\nاقترب من صلاتك، وامنح وقتك حقه."
                );
            }
        }
    }

    checkPrayerTimes();
    setInterval(checkPrayerTimes, 15000);
})();
