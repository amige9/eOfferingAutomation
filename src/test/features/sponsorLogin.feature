Feature: Sponsor Login

    @Regression
    Scenario: Successful Sponsor Login
        Given the sponsor navigates to the login page
        When the sponsor enters a valid username as "yayeno5609@togito.com" and valid password as "Qwerty12@"
        And the sponsor clicks on the sign in button
        Then the sponsor should be logged in
        # yayeno5609@togito.com

    @fail
    Scenario: Successful Sponsor Login
        Given the sponsor navigates to the login page
        When the sponsor enters a valid username as "yayeno5609@togito.com" and valid password as "Qwerty12@"
        And the sponsor clicks on the sign in button
        Then the sponsor should be logged in
