Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "007" in the students list
When I try to register the student "Paulo Borba" with CPF "007"
Then I can see "Paulo Borba" with CPF "007" in the students list


