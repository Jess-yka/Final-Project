package org.launchcode.hipsterhack.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.launchcode.hipsterhack.web.rest.TestUtil;

public class GradesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grades.class);
        Grades grades1 = new Grades();
        grades1.setId(1L);
        Grades grades2 = new Grades();
        grades2.setId(grades1.getId());
        assertThat(grades1).isEqualTo(grades2);
        grades2.setId(2L);
        assertThat(grades1).isNotEqualTo(grades2);
        grades1.setId(null);
        assertThat(grades1).isNotEqualTo(grades2);
    }
}
