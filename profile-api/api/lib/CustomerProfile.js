const CustomerProfile = () => {
    this.Address = "";
    this.emailAddress = "";
    this.city = "";
    this.smsConsent = "";
    this.customerType = "";
    this.country = "";
    this.orgVatNumber = "";
    this.directMailConsent = "";
    this.username = "";
    this.privacyPolicy = "";
    this.mobileNumber = "";
    this.emailConsent = "";
    this.zip = "";
    this.password = "";
    this.lastUpdate = "";
    this.workNumber = "";
    this.buildingNumber = "";
    this.customerID = "";
    this.memberNumber = "";
    this.lastName = "";
    this.organisationName = "";
    this.createdDate = "";
    this.firstName = "";

    const initData = (generate) => {
        for (let key in this) {
            if (this.hasOwnProperty(key)) this[key] = "";
        }
        this.customerType = "Business";
        if (generate) {
            this.customerID = makeid(10);
        }

    };

    const setData = data => {
        if (!data) return;
        for (let key in data) {
            console.log("key; ", key);
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    };
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const getData = () => {
        const customer = [
            {
                name: "Address",
                value: this.Address
            },
            {
                name: "emailAddress",
                value: this.emailAddress
            },
            {
                name: "city",
                value: this.city
            },
            {
                name: "smsConsent",
                value: this.smsConsent
            },
            {
                name: "customerType",
                value: this.customerType
            },
            {
                name: "country",
                value: this.country
            },
            {
                name: "orgVatNumber",
                value: this.orgVatNumber
            },
            {
                name: "directMailConsent",
                value: this.directMailConsent
            },
            {
                name: "username",
                value: this.username
            },
            {
                name: "privacyPolicy",
                value: this.privacyPolicy
            },
            {
                name: "mobileNumber",
                value: this.mobileNumber
            },
            {
                name: "emailConsent",
                value: this.emailConsent
            },
            {
                name: "zip",
                value: this.zip
            },
            {
                name: "password",
                value: this.password
            },
            {
                name: "lastUpdate",
                value: this.lastUpdate
            },
            {
                name: "workNumber",
                value: this.workNumber
            },
            {
                name: "buildingNumber",
                value: this.buildingNumber
            },
            {
                name: "customerID",
                value: this.customerID
            },
            {
                name: "memberNumber",
                value: this.memberNumber
            },
            {
                name: "lastName",
                value: this.lastName
            },
            {
                name: "organisationName",
                value: this.organisationName
            },

            {
                name: "createdDate",
                value: this.createdDate
            },

            {
                name: "firstName",
                value: this.firstName
            }
        ];

        return customer;
    };

    return { initData, getData, setData };
};

module.exports = CustomerProfile;
