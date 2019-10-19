window.addEventListener('load', () => {
    let long
    let lat
    const locationTimezone       = document.querySelector('.location-timezone')
    const temperatureDegree      = document.querySelector('.temperature-degree')
    const degreeSection          = document.querySelector('.degree-section')
    const temperatureDescription = document.querySelector('.temperature-description')
    const dailyDescription       = document.querySelector('.daily-description')
    const temperatureSpan        = document.querySelector('.degree-section span')
    const hourlyDescription      = document.querySelector('.hourly-description')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat  = position.coords.latitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api   = `${proxy}https://api.darksky.net/forecast/8482804e007e797690d05afc2bea6ee0/${lat},${long}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const { icon, summary, temperature } = data.currently
                temperatureDegree.textContent        = temperature
                temperatureDescription.textContent   = summary

                const currentTimeZoneText            = data.timezone.replace(/_/g, ' ')
                locationTimezone.textContent         = currentTimeZoneText
                
                const celsius                        = (temperature -32) * (5 / 9)
                setIcons(icon, document.querySelector('.icon'))
                degreeSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                       temperatureSpan.textContent   = 'C'
                       temperatureDegree.textContent = Math.floor(celsius) 
                    }
                    else {
                        temperatureSpan.textContent   = 'F'
                        temperatureDegree.textContent = temperature
                    }
                })

                const { summary: dailySummary }  = data.daily
                dailyDescription.textContent     = dailySummary

                const { summary: hourlySummary } = data.hourly
                hourlyDescription.textContent    = hourlySummary
            })
        })
    }

    function setIcons(icon, iconID) {
        const skyCons     = new Skycons({'color': 'yellow'})
        const currentIcon = icon.replace(/-/g, '_').toUpperCase()
        skyCons.play()
        return skyCons.set(iconID, Skycons[currentIcon])
    }
})